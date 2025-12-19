import type { CarInformation } from 'src/types/car.types';
import { getCurrentDate } from 'src/utils/date.utils';

export type DefaultFilter = Omit<CarInformation, 'id' | 'ownerID'>;
export type Filter = DefaultFilter;

export function carDataFilter(
  data: CarInformation[],
  filterBy: (val: CarInformation) => CarInformation[] | boolean,
): CarInformation[] {
  return data.filter((val) => filterBy(val));
}

export const defaultFilterValues: Filter = {
  color: '',
  make: '',
  mileage: 0,
  model: '',
  onSale: false,
  price: 0,
  registrationDetails: { expiryDate: getCurrentDate(), registrationNumber: '', vinNumber: '' },
  repairHistory: '',
  sold: false,
  year: 0,
  furtherRepairsNeeded: false,
};

export type MarketFilter = Omit<CarInformation, 'id' | 'ownerID' | 'onSale'>;
