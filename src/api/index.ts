import type { VehicleResponse, VehicleStorage } from './api.types';
import { get } from './methods';
import { API_GARAGE_URL, API_MARKET_URL } from './urls';

const defaultVehicals: VehicleResponse = { cars: [] };

async function fetchGarage(): Promise<VehicleResponse> {
  try {
    const res = await get(API_GARAGE_URL);

    const resData: VehicleResponse = await res.json();

    return resData;
  } catch (error) {
    console.log(error);
    return defaultVehicals;
  }
}

async function fetchMarket(): Promise<VehicleResponse> {
  try {
    const res = await get(API_MARKET_URL);

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
