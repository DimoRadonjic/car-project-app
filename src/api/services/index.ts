import { garageService, marketService } from 'src/boot/services';
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

export async function servicesSetup(): Promise<void> {
  const servicesPromises = [marketService.getData(), garageService.getData()];
  try {
    await Promise.all(servicesPromises);
  } catch (error) {
    console.error('Failed services setup', error);
  }
}
