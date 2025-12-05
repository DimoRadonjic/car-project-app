import type { VehicalResponse } from './api.types';
import { API_GARAGE_URL } from './urls';

const empty: VehicalResponse = { cars: [] };

async function getGarage(): Promise<VehicalResponse> {
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
    return empty;
  }
}

async function getMarket(): Promise<VehicalResponse> {
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
    return empty;
  }
}

// add get on type or all
export async function getVehicals(api_url: 'garage' | 'market'): Promise<VehicalResponse> {
  if (api_url.toLowerCase() === api_url) {
    return await getGarage();
  } else {
    return await getMarket();
  }
}
