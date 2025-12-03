<script setup lang="ts">
import { API_FINANCE_URL, API_HISTORY_URL } from '@/api';
import ExpensesList from '@/components/expenses/ExpensesList.vue';
import IncomeList from '@/components/incomes/IncomeList.vue';
import PurchaseForm from '@/components/purchase/PurchaseForm.vue';
import type { FinanceData, HistoryTransaction } from '@/types/finance.types';
import { ref, watchEffect } from 'vue';

const financeData = ref<FinanceData>({
  purchase: {
    budget: 0,
    amountForPurchase: 0,
    percentage: 0,
  },
  expenses: [],
  income: [],
});

const loading = ref(true);

async function fetchFinanceData() {
  try {
    const res = await fetch(API_FINANCE_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    financeData.value = await res.json();
    console.log('res finance', await res.json());
  } catch (error) {
    console.error('Error fetching finance data:', error);
  }
}

async function updateBudget() {
  const totalExpenses = financeData.value.expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0,
  );
  const totalIncome = financeData.value.income.reduce((sum, income) => sum + income.amount, 0);
  financeData.value.purchase.budget = totalIncome - totalExpenses;

  let historyTransactions: HistoryTransaction[] = [];

  const doneExpenses: HistoryTransaction[] = financeData.value.expenses
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

  const receivedIncome: HistoryTransaction[] = financeData.value.income
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

  console.log('history', historyTransactions);

  try {
    await fetch(API_FINANCE_URL, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(financeData.value),
    });
    if (historyTransactions.length > 0) {
      await fetch(API_HISTORY_URL, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ transactions: historyTransactions }),
      });
    }
  } catch (error) {
    console.error('Error fetching finance data:', error);
  }
}

watchEffect(() => {
  loading.value = true;
  void fetchFinanceData();
  loading.value = false;
});
</script>

<template>
  <q-page v-if="!loading" class="finance-page">
    <div>
      <h3>Balance: {{ financeData.purchase.budget }} €</h3>
    </div>
    <div class="finance-cards">
      <q-card class="q-pa-md card purchase-card">
        <h4>Purchase section</h4>
        <PurchaseForm v-model="financeData.purchase" @update-finance="updateBudget" />
      </q-card>
      <q-card class="q-pa-md card expenses-card">
        <h4>Expenses Section</h4>
        <ExpensesList v-model="financeData.expenses" @update-finance="updateBudget" />
      </q-card>
      <q-card class="q-pa-md card income-card">
        <h4>Income Section</h4>
        <IncomeList v-model="financeData.income" @update-finance="updateBudget" />
      </q-card>
    </div>
  </q-page>
</template>

<style scoped lang="scss">
.finance-page {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.finance-cards {
  display: flex;
  gap: 20px;
}

.card {
  display: flex;
  flex-direction: column;
  gap: 40px 0;
  height: fit-content;
}

h4 {
  margin: 0;
}
</style>
