import { defaultVehicals } from 'src/api';
import type { VehicleResponse } from 'src/api/api.types';
import { get } from 'src/api/methods';
import { API_GARAGE_URL } from 'src/api/urls';

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
