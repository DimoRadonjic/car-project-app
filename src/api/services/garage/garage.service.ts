import type { CarInformation } from 'src/types/car.types';
import { containsCar } from '../utils';
import { API_GARAGE_URL } from '../../urls';
import { put } from '../../methods';
import { fetchGarage } from '.';
import type { ServiceInterface } from '..';
import type { ProxyMarketService } from '../market/market.service';

class GarageService implements ServiceInterface {
  async getData(): Promise<CarInformation[]> {
    const { cars } = await fetchGarage();
    return cars;
  }

  async updateData(car: CarInformation, garage: CarInformation[]): Promise<CarInformation[]> {
    let newGarageCars: CarInformation[] = garage.slice();

    try {
      if (!containsCar(garage, car.id)) {
        newGarageCars = [...garage, car];
      } else {
        newGarageCars = garage.map((garageCar) => (garageCar.id === car.id ? car : garageCar));
      }

      const body = JSON.stringify({ cars: newGarageCars });

      await put(API_GARAGE_URL, body);

      return newGarageCars;
    } catch (error) {
      console.log('updateGarageCarInfo - error', error);
      return garage;
    }
  }
}

export class ProxyGarageService implements GarageService {
  constructor(private readonly marketService: ProxyMarketService) {}

  private serviceInstance: GarageService | null = null;
  private cache: CarInformation[] = [];

  async getData(force = false) {
    if (this.cache.length > 0 && !force) {
      return this.cache;
    }
    if (!this.serviceInstance) {
      console.log('Creating garage service.........');
      this.serviceInstance = new GarageService();
    }
    const data = await this.serviceInstance.getData();
    this.cache = data;

    return data;
  }

  // just update garage ( PUT and POST calls)
  async updateData(car: CarInformation): Promise<CarInformation[]> {
    if (!this.serviceInstance) await this.getData();

    // await this.marketService.getData();

    if (this.serviceInstance) {
      this.cache = await this.serviceInstance.updateData(car, this.cache);

      await this.marketService.updateData(car);
    }

    return this.cache;
  }
}
