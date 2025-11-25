export interface EssentialLinkProps {
  title: string;
  caption?: string;
  link?: string;
  icon?: string;
  target?: string;
}

export interface TableColumn {
  name: string;
  required?: boolean;
  label: string;
  align?: 'left' | 'right' | 'center';
  field: string | ((row: CarInformation) => string);
  format?: (val: string) => string;
  sortable?: boolean;
  sort?: (a: string, b: string) => number;
}

export interface CarInformation {
  name: string;
  make: string;
  model: string;
  year: number;
  color: string;
  mileage: number;
  price: number;
  onsale: boolean;
  sold: boolean;
  repairHistory: string[];
  registrationDetails: {
    registrationNumber: string;
    expiryDate: string;
  } | null;
  furtherRepairsNeeded?: boolean;
}
