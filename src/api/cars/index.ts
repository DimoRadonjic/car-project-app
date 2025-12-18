import type { CarInformation } from 'src/types/car.types';
import { ProxyGarageService } from '../services/garage.service';
import { defaultVehicals } from '..';
import type { VehicleResponse } from '../api.types';
import { API_GARAGE_URL } from '../urls';
import { get } from '../methods';

export const garageService = new ProxyGarageService();

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

export async function fetchGarage(): Promise<VehicleResponse> {
  try {
    const res = await get(API_GARAGE_URL);

    const resData: VehicleResponse = await res.json();

    return resData;
  } catch (error) {
    console.log(error);
    return defaultVehicals;
  }
}
