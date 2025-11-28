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

export type ExpenseType =
  | 'insurance'
  | 'tax'
  | 'repair'
  | 'maintenance'
  | 'registration'
  | 'service';

export interface Expense {
  type: ExpenseType;
  amount: number;
  dueDate: Date;
  status: 'pending' | 'done' | 'overdue';
  id: string;
}

export interface Income {
  source: 'car sold' | 'parts sold' | 'other';
  amount: number;
  receivedDate: Date;
  status: 'pending' | 'recevied';
  id: string;
}

export interface FinanceData {
  purchase: {
    budget: number;
    amountForPurchase: number;
    percentage: number;
  };
  expenses: Expense[];
  income: Income[];
}

export const sampleCarData: CarInformation[] = [
  {
    make: 'Toyota',
    model: 'Corolla',
    year: 2018,
    color: 'Red',
    mileage: 42000,
    price: 15999,
    onsale: true,
    sold: false,
    repairHistory: ['Brake pads replaced - 2019', 'Battery replaced - 2021'],
    registrationDetails: {
      registrationNumber: 'ABC-1234',
      expiryDate: '2026-07-31',
    },
    furtherRepairsNeeded: false,
  },
  {
    make: 'Honda',
    model: 'Civic',
    year: 2020,
    color: 'Midnight Blue',
    mileage: 18500,
    price: 18950,
    onsale: false,
    sold: false,
    repairHistory: ['Tire rotation - 2021'],
    registrationDetails: {
      registrationNumber: 'DEF-5678',
      expiryDate: '2025-03-15',
    },
  },
  {
    make: 'Tesla',
    model: 'Model 3',
    year: 2022,
    color: 'Green',
    mileage: 7200,
    price: 32999,
    onsale: true,
    sold: false,
    repairHistory: [],
    registrationDetails: {
      registrationNumber: 'TES-3000',
      expiryDate: '2027-11-01',
    },
  },
  {
    make: 'Ford',
    model: 'Mustang',
    year: 1967,
    color: 'Black',
    mileage: 98000,
    price: 45000,
    onsale: false,
    sold: true,
    repairHistory: ['Engine rebuild - 2015', 'Paint job - 2018'],
    registrationDetails: null,
    furtherRepairsNeeded: true,
  },
  {
    make: 'Kia',
    model: 'Sorento',
    year: 2016,
    color: 'Silver',
    mileage: 76000,
    price: 12900,
    onsale: true,
    sold: false,
    repairHistory: ['AC serviced - 2020', 'Rear suspension - 2022'],
    registrationDetails: {
      registrationNumber: 'KIA-9012',
      expiryDate: '2024-12-05',
    },
  },
];

export interface HistoryTransaction {
  id: string;
  type: 'expense' | 'income';
  category: string;
  amount: number;
  date: Date;
}
