import type { CarInformation } from 'src/types/car.types';

export function carDataFilter(
  data: CarInformation[],
  filterBy: (val: CarInformation) => CarInformation[] | boolean,
): CarInformation[] {
  return data.filter((val) => filterBy(val));
}
