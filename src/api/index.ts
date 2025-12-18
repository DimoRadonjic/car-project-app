import type { VehicleResponse, VehicleStorage } from './api.types';
import { API_GARAGE_URL, API_MARKET_URL } from './urls';

const defaultVehicals: VehicleResponse = { cars: [] };

async function fetchGarage(): Promise<VehicleResponse> {
  try {
    const res = await fetch(API_GARAGE_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const resData: VehicleResponse = await res.json();

    return resData;
  } catch (error) {
    console.log(error);
    return defaultVehicals;
  }
}

async function fetchMarket(): Promise<VehicleResponse> {
  try {
    const res = await fetch(API_MARKET_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    let resData: VehicleResponse = await res.json();

    resData = { ...resData, cars: resData.cars.filter(({ sold, onSale }) => !sold && onSale) };

    return resData;
  } catch (error) {
    console.log(error);
    return defaultVehicals;
  }
}

export async function fetchVehicals(api_url: VehicleStorage): Promise<VehicleResponse> {
  if (api_url.toLowerCase() === 'garage') {
    return await fetchGarage();
  } else {
    return await fetchMarket();
  }
}
