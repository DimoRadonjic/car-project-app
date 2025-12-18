import type { CarInformation } from 'src/types/car.types';

export const defaultCar: CarInformation = {
  color: '',
  id: '',
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
