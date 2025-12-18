import type { CarInformation } from 'src/types/car.types';

export interface ServiceInterface {
  getData(): Promise<CarInformation[]>;
  updateData(car: CarInformation, cache: CarInformation[]): Promise<CarInformation[]>;
}
