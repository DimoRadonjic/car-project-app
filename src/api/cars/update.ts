import type { CarInformation } from 'src/types/car.types';
import { API_GARAGE_URL } from '../urls';

export async function updateCarInfo(cars: CarInformation[]) {
  try {
    const res = await fetch(API_GARAGE_URL, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ cars: cars }),
    });
    console.log('res', await res.json());
  } catch (error) {
    console.log('updateCarInfo - error', error);
  }
}
