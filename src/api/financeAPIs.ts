import type { FinanceData, HistoryTransaction } from 'src/types/finance.types';
import { API_PURCHASE_URL, API_FINANCE_URL, API_HISTORY_URL } from './urls';

export async function updatePurchaseData(data: {
  budget: number;
  amountForPurchase: number;
  percentage: number;
}): Promise<void> {
  try {
    const res = await fetch(API_PURCHASE_URL, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    console.log('res', res);
  } catch (error) {
    console.error('error', error);
  }
}

export async function updateBudget(financeData: FinanceData): Promise<void> {
  const historyTransactions = getHistoryTransactions(financeData);
  try {
    await fetch(API_FINANCE_URL, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(financeData),
    });
    if (historyTransactions.length > 0) {
      void updateHistoryTransactions(historyTransactions);
    }
  } catch (error) {
    console.error('Error fetching finance data:', error);
  }
}

function getHistoryTransactions(financeData: FinanceData): HistoryTransaction[] {
  const totalExpenses = financeData.expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const totalIncome = financeData.income.reduce((sum, income) => sum + income.amount, 0);
  financeData.purchase.budget = totalIncome - totalExpenses;

  let historyTransactions: HistoryTransaction[] = [];

  const doneExpenses: HistoryTransaction[] = financeData.expenses
    .filter((ex) => ex.status === 'done')
    .map(
      (ex) =>
        ({
          category: ex.type,
          amount: ex.amount,
          date: ex.dueDate,
          type: 'expense',
        }) as HistoryTransaction,
    );

  const receivedIncome: HistoryTransaction[] = financeData.income
    .filter((income) => income.status === 'recevied')
    .map(
      (income) =>
        ({
          category: income.source,
          amount: income.amount,
          date: income.receivedDate,
          type: 'income',
        }) as HistoryTransaction,
    );

  historyTransactions = doneExpenses.concat(receivedIncome);
  return historyTransactions;
}

export async function updateHistoryTransactions(
  historyTransactions: HistoryTransaction[],
): Promise<void> {
  try {
    await fetch(API_HISTORY_URL, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ transactions: historyTransactions }),
    });
  } catch (error) {
    console.error('UpdateHistoryTransactions:', error);
  }
}
