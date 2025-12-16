import type { CarInformation } from 'src/types/car.types';
import { API_GARAGE_URL, API_MARKET_URL } from '../urls';
import { fetchVehicals } from '..';

function containsCar(arr: CarInformation[], carID: string) {
  return arr.find(({ id }) => id === carID);
}

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

export async function updateMarket(car: CarInformation): Promise<void> {
  try {
    const { cars: market } = await fetchVehicals('market');

    let body;

    console.log('Car in question', car);
    if (!containsCar(market, car.id)) {
      body = JSON.stringify({ cars: [...market, car] });

      console.log('Car added to market', car);
    } else {
      const newMarketCars = market.filter((marketCar) => marketCar.id !== car.id);
      body = JSON.stringify({ cars: newMarketCars });

      console.log('Car removed from market', car);
    }

    await fetch(API_MARKET_URL, {
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

export async function putCarOnMarket(car: CarInformation): Promise<void> {
  try {
    await updateMarket(car);
  } catch (error) {
    console.log('putCarOnMarket - error', error);
  }
}

export async function updateGarage(car: CarInformation): Promise<void> {
  try {
    const { cars: garage } = await fetchVehicals('garage');

    // const body = JSON.stringify({
    //   cars: garage.map((garageCar) => (garageCar.id === car.id ? car : garageCar)),
    // });

    let body;

    console.log('Car in question', car);
    if (!containsCar(garage, car.id)) {
      body = JSON.stringify({ cars: [...garage, { ...car, onSale: false }] });

      console.log('Car added to garage', car);
    } else {
      const newGarageCars = garage.map((garageCar) => (garageCar.id === car.id ? car : garageCar));
      body = JSON.stringify({ cars: newGarageCars });

      console.log('Car removed / modified from garage', car);
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
