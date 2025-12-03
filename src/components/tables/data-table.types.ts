import type { CarInformation } from '@/types/car.types';

export type TableRow = CarInformation;

export type TableColumn = {
  name: string;
  required?: boolean;
  label: string;
  align?: 'left' | 'right' | 'center';
  field: string | ((row: CarInformation) => string | void);
  format?: (val: string) => string;
  sortable?: boolean;
  sort?: (a: string, b: string) => number;
};
