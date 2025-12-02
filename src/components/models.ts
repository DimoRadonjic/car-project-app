export type EssentialLinkProps = {
  title: string;
  caption?: string;
  link?: string;
  icon?: string;
  target?: string;
};

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

export type CarInformation = {
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
};

export type ExpenseType =
  | 'insurance'
  | 'tax'
  | 'repair'
  | 'maintenance'
  | 'registration'
  | 'service';

export type ExpenseStatus = 'pending' | 'done' | 'overdue';

export type Expense = {
  type: ExpenseType;
  amount: number;
  dueDate: Date;
  status: ExpenseStatus;
  id: string;
};

export type IncomeSource = 'car sold' | 'parts sold' | 'other';
export type IncomeStatus = 'pending' | 'recevied';

export type Income = {
  source: IncomeSource;
  amount: number;
  receivedDate: Date;
  status: IncomeStatus;
  id: string;
};

export type FinanceData = {
  purchase: {
    budget: number;
    amountForPurchase: number;
    percentage: number;
  };
  expenses: Expense[];
  income: Income[];
};

export type HistoryTransaction = {
  id: string;
  type: 'expense' | 'income';
  category: string;
  amount: number;
  date: Date;
};
