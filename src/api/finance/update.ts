import type { FinanceData, HistoryTransaction } from 'src/types/finance.types';
import { API_FINANCE_URL, API_HISTORY_URL } from '../urls';
import type { CarInformation } from 'src/types/car.types';
import { updateGarage } from '../cars/update';
import { put } from '../methods';
import { marketService } from '../market';

// import { getHistoryTransactions } from './util';

export async function updatePurchaseData(data: FinanceData): Promise<void> {
  const body = JSON.stringify(data);
  try {
    await put(API_FINANCE_URL, body);
  } catch (error) {
    console.error('error', error);
  }
}

export async function updateFinance(financeData: FinanceData) {
  // const historyTransactions = getHistoryTransactions(financeData);
  const body = JSON.stringify(financeData);
  try {
    await put(API_FINANCE_URL, body);

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
  const body = JSON.stringify({ transactions: historyTransactions });
  try {
    await put(API_HISTORY_URL, body);
  } catch (error) {
    console.error('UpdateHistoryTransactions:', error);
  }
}

export async function makePurchase(carData: CarInformation): Promise<void> {
  const promises = [marketService.updateData(carData), updateGarage(carData)];
  try {
    await Promise.all(promises);
  } catch (error) {
    console.log('MakePurchase', error);
  }
}
