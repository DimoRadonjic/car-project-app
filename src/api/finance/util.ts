import type { FinanceData, HistoryTransaction } from 'src/types/finance.types';

export function getHistoryTransactions(financeData: FinanceData): HistoryTransaction[] {
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
