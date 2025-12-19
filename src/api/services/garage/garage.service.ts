import type { CarInformation } from 'src/types/car.types';
import { containsCar } from '../utils';
import { API_GARAGE_URL } from '../../urls';
import { put } from '../../methods';
import { marketService, type ServiceInterface } from '..';
import { fetchGarage } from '.';

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
        newGarageCars = garage.filter((garageCar) => (garageCar.id === car.id ? car : garageCar));
      }

      console.log('garage update car', newGarageCars);

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
    if (this.serviceInstance) {
      console.log('car to update - service', car);

      this.cache = await this.serviceInstance.updateData(car, this.cache);
    }
    return this.cache;
  }

  // update garage and market
  async putOnMarket(carID: string) {
    if (this.serviceInstance) {
      let updatedCar: CarInformation | undefined = this.cache.find(({ id }) => id === carID);
      if (updatedCar) {
        updatedCar = { ...updatedCar, onSale: true };

        this.cache = await this.serviceInstance.updateData(updatedCar, this.cache);
        void marketService.updateData(updatedCar);
      }
    }
  }
}
