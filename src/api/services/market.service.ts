import type { CarInformation } from 'src/types/car.types';
import { containsCar } from './utils';
import { API_MARKET_URL } from '../urls';
import { put } from '../methods';
import type { ServiceInterface } from '.';
import { fetchMarket } from '../market';

class MarketService implements ServiceInterface {
  async getData(): Promise<CarInformation[]> {
    const { cars } = await fetchMarket();
    return cars;
  }

  // update Market ( car joins from garage or is removed from market by purchase )
  async updateData(car: CarInformation, market: CarInformation[]): Promise<CarInformation[]> {
    let newMarketCars: CarInformation[] = market.slice();

    try {
      if (!containsCar(market, car.id)) {
        newMarketCars = [...market, car];
      } else {
        newMarketCars = market.filter((marketCar) => marketCar.id !== car.id);
      }

      const body = JSON.stringify({ cars: newMarketCars });

      await put(API_MARKET_URL, body);

      return newMarketCars;
    } catch (error) {
      console.log('updateGarageCarInfo - error', error);
      return market;
    }
  }
}

export class ProxyMarketService implements MarketService {
  private serviceInstance: MarketService | null = null;
  private cache: CarInformation[] = [];

  async getData(force = false) {
    if (this.cache.length > 0 && !force) {
      return this.cache;
    }
    if (!this.serviceInstance) {
      console.log('Creating market service.........');
      this.serviceInstance = new MarketService();
    }
    const data = await this.serviceInstance.getData();
    this.cache = data;

    return data;
  }

  async updateData(car: CarInformation): Promise<CarInformation[]> {
    if (this.serviceInstance) {
      this.cache = await this.serviceInstance.updateData(car, this.cache);
    }
    return this.cache;
  }
}
