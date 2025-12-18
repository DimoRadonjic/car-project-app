import type { CarInformation } from 'src/types/car.types';
import { API_GARAGE_URL } from '../urls';
import { containsCar } from '../services/utils';
import { put } from '../methods';
import { garageService } from '.';

// update a single car in garage
// add car to market by onSale becoming true
// remove car from garage by user
// add new car to garage

export async function updateGarageCarInfo(cars: CarInformation[]): Promise<void> {
  const body = JSON.stringify({ cars: cars });

  try {
    await put(API_GARAGE_URL, body);
  } catch (error) {
    console.log('updateGarageCarInfo - error', error);
  }
}

export async function putCarOnMarket(car: CarInformation): Promise<void> {
  try {
    await garageService.putOnMarket(car.id);
  } catch (error) {
    console.log('putCarOnMarket - error', error);
  }
}

export async function updateGarage(car: CarInformation): Promise<void> {
  try {
    const garage = await garageService.getData();

    let newGarageCars;

    if (!containsCar(garage, car.id)) {
      newGarageCars = [...garage, { ...car, onSale: false }];
    } else {
      newGarageCars = garage.map((garageCar) => (garageCar.id === car.id ? car : garageCar));
    }
    const body = JSON.stringify({ cars: newGarageCars });

    await put(API_GARAGE_URL, body);
  } catch (error) {
    console.log('updateGarageCarInfo - error', error);
  }
}
