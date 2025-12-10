import type { CarInformation } from 'src/types/car.types';
import type { Expense, HistoryTransaction, Income } from 'src/types/finance.types';

export type VehicleResponse = {
  cars: CarInformation[];
};

export type ProfileResponse = {
  name: string;
  email: string;
};

export type FinanceResponse = {
  purchase: {
    budget: number;
    amountForPurchase: number;
    percentage: number;
  };
  expenses: Expense[];
  income: Income[];
};

export type HistoryTransactionResponse = HistoryTransaction[];

export type ExpenseResponse = Expense[];
export type IncomeResponse = Income[];
