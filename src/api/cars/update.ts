import type { CarInformation } from 'src/types/car.types';
import { API_GARAGE_URL, API_MARKET_URL } from '../urls';
import { fetchVehicals } from '..';

function containsCar(arr: CarInformation[], carID: string) {
  return arr.find(({ id }) => id === carID);
}

export async function updateCarInfo(cars: CarInformation[]): Promise<void> {
  try {
    const res = await fetch(API_GARAGE_URL, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ cars: cars }),
    });
    console.log('updateCarInfo - res', await res.json());
  } catch (error) {
    console.log('updateCarInfo - error', error);
  }
}

export async function updateMarket(car: CarInformation): Promise<void> {
  try {
    const { cars: market } = await fetchVehicals('market');

    let body;
    console.log('does it contain car Market', containsCar(market, car.id));

    if (!containsCar(market, car.id)) {
      body = JSON.stringify({ cars: [...market, car] });
    } else {
      const newMarketCars = market.filter((marketCar) => marketCar.id !== car.id);
      body = JSON.stringify({ cars: newMarketCars });
    }

    console.log(
      'new market after removal',
      market.filter((marketCar) => marketCar.id !== car.id),
    );

    await fetch(API_MARKET_URL, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: body,
    });
  } catch (error) {
    console.log('updateCarInfo - error', error);
  }
}

export async function putCarOnMarket(car: CarInformation): Promise<void> {
  console.log('car to be put on market', car, car.onSale);
  try {
    await updateMarket(car);
  } catch (error) {
    console.log('putCarOnMarket - error', error);
  }
}

export async function updateGarage(car: CarInformation): Promise<void> {
  try {
    const { cars: garage } = await fetchVehicals('garage');

    const body = JSON.stringify({
      cars: garage.map((garageCar) => (garageCar.id === car.id ? car : garageCar)),
    });

    console.log(
      'body to garage',
      garage.map((garageCar) => (garageCar.id === car.id ? car : garageCar)),
    );
    await fetch(API_GARAGE_URL, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: body,
    });
    console.log('update garage =', garage);
  } catch (error) {
    console.log('updateCarInfo - error', error);
  }
}
