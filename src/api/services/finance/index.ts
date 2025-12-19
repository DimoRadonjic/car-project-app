import type { Expense, HistoryTransaction, Income, Purchase } from 'src/types/finance.types';
import type {
  ExpenseResponse,
  FinanceResponse,
  HistoryTransactionResponse,
  IncomeResponse,
} from '../../api.types';
import { API_EXPENSE_URL, API_FINANCE_URL, API_INCOME_URL } from '../../urls';

const defaultIncome: Income[] = [];
const defaultExpense: Expense[] = [];
const defaultPurchase: Purchase = { budget: 0, amountForPurchase: 0, percentage: 15 };
const defaultHistoryTransactions: HistoryTransaction[] = [];

const defaultFinance: FinanceResponse = {
  expenses: defaultExpense,
  income: defaultIncome,
  purchase: defaultPurchase,
};

export async function fetchFinance(): Promise<FinanceResponse> {
  try {
    const res = await fetch(API_FINANCE_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return await res.json();
  } catch (error) {
    console.log('getFinance', error);
    return defaultFinance;
  }
}

export async function fetchIncome(): Promise<IncomeResponse> {
  try {
    const res = await fetch(API_INCOME_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return await res.json();
  } catch (error) {
    console.log('getFinance', error);
    return defaultIncome;
  }
}

export async function fetchExpense(): Promise<ExpenseResponse> {
  try {
    const res = await fetch(API_EXPENSE_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return await res.json();
  } catch (error) {
    console.log('getFinance', error);
    return defaultExpense;
  }
}

export async function fetchHistoryTransactions(): Promise<HistoryTransactionResponse> {
  try {
    const res = await fetch(API_EXPENSE_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return await res.json();
  } catch (error) {
    console.log('getFinance', error);
    return defaultHistoryTransactions;
  }
}
