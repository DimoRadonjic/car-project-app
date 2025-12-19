import type { CarInformation } from 'src/types/car.types';

export interface ServiceInterface {
  getData(): Promise<CarInformation[]>;
  updateData(car: CarInformation, cache: CarInformation[]): Promise<CarInformation[]>;
}

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
