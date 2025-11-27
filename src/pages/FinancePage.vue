<script setup lang="ts">
import { API_EXPENSE_URL, API_FINANCE_URL, API_PURCHASE_URL } from 'src/api';
import ExpensesList from 'src/components/expenses/ExpensesList.vue';
import IncomeList from 'src/components/incomes/IncomeList.vue';
import { type FinanceData } from 'src/components/models';
import PurchaseForm from 'src/components/purchase/PurchaseForm.vue';
import { ref, watchEffect } from 'vue';

const financeData = ref<FinanceData>({
  purchase: {
    budget: 0,
    amountForPurchase: 0,
    percentage: 0,
  },
  expanses: [],
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
    // financeData.value = await res.json();
    console.log('res finance', await res.json());
  } catch (error) {
    console.error('Error fetching finance data:', error);
  }
}

async function fetchPurchaseData() {
  try {
    const res = await fetch(API_PURCHASE_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    financeData.value.purchase = await res.json();
  } catch (error) {
    console.error('Error fetching finance data:', error);
  }
}

async function fetchExpansesData() {
  try {
    const res = await fetch(API_EXPENSE_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    financeData.value.expanses = await res.json();
  } catch (error) {
    console.error('Error fetching finance data:', error);
  }
}

watchEffect(() => {
  loading.value = true;
  void fetchFinanceData();
  void fetchPurchaseData();
  void fetchExpansesData();
  loading.value = false;
});
</script>

<template>
  <q-page v-if="!loading" class="finance-page">
    <section>
      <q-card class="q-pa-md card purchase-card">
        <h4>Purchase section</h4>
        <PurchaseForm v-model="financeData.purchase" />
      </q-card>
    </section>
    <section>
      <q-card class="q-pa-md card expenses-card">
        <h4>Expenses Section</h4>
        <ExpensesList v-model="financeData.expanses" />
      </q-card>
    </section>

    <section>
      <q-card class="q-pa-md card income-card">
        <h4>Income Section</h4>
        <IncomeList v-model="financeData.income" />
      </q-card>
    </section>
  </q-page>
</template>

<style scoped lang="scss">
.finance-page {
  display: flex;
  gap: 20px;
}

section {
  border: 2px solid #ccc;
  height: fit-content;
}

.card {
  display: flex;
  flex-direction: column;
  gap: 40px 0;
}

h4 {
  margin: 0;
}
</style>
