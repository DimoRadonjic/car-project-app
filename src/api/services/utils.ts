import type { CarInformation } from 'src/types/car.types';

export function containsCar(arr: CarInformation[], carID: string) {
  return arr.find(({ id }) => id === carID);
}
