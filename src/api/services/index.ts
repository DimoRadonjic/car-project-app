import type { CarInformation } from 'src/types/car.types';
import { ProxyGarageService } from './garage/garage.service';
import { ProxyMarketService } from './market/market.service';

export interface ServiceInterface {
  getData(): Promise<CarInformation[]>;
  updateData(car: CarInformation, cache: CarInformation[]): Promise<CarInformation[]>;
}

export const garageService = new ProxyGarageService();
export const marketService = new ProxyMarketService();

export const defaultCar: CarInformation = {
  color: '',
  id: '',
  ownerID: '',
  make: '',
  mileage: 0,
  model: '',
  onSale: false,
  price: 0,
  registrationDetails: {
    expiryDate: '',
    registrationNumber: '',
    vinNumber: '',
  },
  repairHistory: '',
  sold: false,
  year: 0,
  furtherRepairsNeeded: false,
};
