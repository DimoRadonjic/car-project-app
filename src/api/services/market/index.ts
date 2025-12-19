import { defaultVehicals } from '../..';
import type { VehicleResponse } from '../../api.types';
import { get } from '../../methods';
import { API_MARKET_URL } from '../../urls';

export async function fetchMarket(): Promise<VehicleResponse> {
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
