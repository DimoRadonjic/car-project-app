import type { FinanceData, HistoryTransaction } from 'src/types/finance.types';
import { API_FINANCE_URL, API_HISTORY_URL } from '../urls';
import type { CarInformation } from 'src/types/car.types';
import { updateGarage, updateMarket } from '../cars/update';

// import { getHistoryTransactions } from './util';

export async function updatePurchaseData(data: FinanceData): Promise<void> {
  try {
    await fetch(API_FINANCE_URL, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.error('error', error);
  }
}

export async function updateFinance(financeData: FinanceData) {
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

export async function makePurchase(carData: CarInformation): Promise<void> {
  const promises = [updateMarket(carData), updateGarage(carData)];
  try {
    await Promise.all(promises);
  } catch (error) {
    console.log('MakePurchase', error);
  }
}
