import type { FinanceData, HistoryTransaction } from 'src/types/finance.types';
import { API_FINANCE_URL, API_HISTORY_URL } from '../urls';

// import { getHistoryTransactions } from './util';

export async function updatePurchaseData(data: FinanceData): Promise<void> {
  try {
    const res = await fetch(API_FINANCE_URL, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    console.log('res - updatePurchaseData', res);
  } catch (error) {
    console.error('error', error);
  }
}

export async function updateFinance(financeData: FinanceData) {
  console.log('financeData', financeData);

  // const historyTransactions = getHistoryTransactions(financeData);

  try {
    await fetch(API_FINANCE_URL, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(financeData),
    });
    // if (historyTransactions.length > 0) {
    //   void updateHistoryTransactions(historyTransactions);
    // }
  } catch (error) {
    console.error('Error fetching finance data:', error);
  }
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
