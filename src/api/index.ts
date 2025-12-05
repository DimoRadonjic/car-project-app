import type { VehicalResponse } from './api.types';
import { API_GARAGE_URL } from './urls';

const defaultVehicals: VehicalResponse = { cars: [] };

async function fetchGarage(): Promise<VehicalResponse> {
  try {
    const res = await fetch(API_GARAGE_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const resData: VehicalResponse = await res.json();

    return resData;
  } catch (error) {
    console.log(error);
    return defaultVehicals;
  }
}

async function fetchMarket(): Promise<VehicalResponse> {
  try {
    const res = await fetch(API_GARAGE_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const resData: VehicalResponse = await res.json();

    return resData;
  } catch (error) {
    console.log(error);
    return defaultVehicals;
  }
}

// add get on type or all
export async function fetchVehicals(api_url: 'garage' | 'market'): Promise<VehicalResponse> {
  if (api_url.toLowerCase() === api_url) {
    return await fetchGarage();
  } else {
    return await fetchMarket();
  }
}
