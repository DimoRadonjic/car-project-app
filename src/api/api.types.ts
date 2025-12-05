import type { CarInformation } from 'src/types/car.types';
import type { Expense, Income } from 'src/types/finance.types';

export type VehicalResponse = {
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

export type ExpenseResponse = Expense[];
export type IncomeResponse = Income[];
