import type { CarInformation } from 'src/types/car.types';
import { API_GARAGE_URL } from '../urls';
import { fetchVehicals } from '..';
import { containsCar } from '../services/utils';
import { marketService } from '../services/market.service';

export async function updateGarageCarInfo(cars: CarInformation[]): Promise<void> {
  try {
    await fetch(API_GARAGE_URL, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ cars: cars }),
    });
  } catch (error) {
    console.log('updateGarageCarInfo - error', error);
  }
}

export async function putCarOnMarket(car: CarInformation): Promise<void> {
  try {
    await marketService.updateData(car);
  } catch (error) {
    console.log('putCarOnMarket - error', error);
  }
}

export async function updateGarage(car: CarInformation): Promise<void> {
  try {
    const { cars: garage } = await fetchVehicals('garage');

    let body;

    if (!containsCar(garage, car.id)) {
      body = JSON.stringify({ cars: [...garage, { ...car, onSale: false }] });
    } else {
      const newGarageCars = garage.map((garageCar) => (garageCar.id === car.id ? car : garageCar));
      body = JSON.stringify({ cars: newGarageCars });
    }

    await fetch(API_GARAGE_URL, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: body,
    });
  } catch (error) {
    console.log('updateGarageCarInfo - error', error);
  }
}
