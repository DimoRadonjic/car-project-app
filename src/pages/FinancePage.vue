<script setup lang="ts">
import ExpensesList from '@/components/expenses/ExpensesList.vue';
import IncomeList from '@/components/incomes/IncomeList.vue';
import PurchaseForm from '@/components/purchase/PurchaseForm.vue';
import type { FinanceData } from '@/types/finance.types';
import { fetchFinance } from 'src/api/finance';
import { updateFinance } from 'src/api/finance/update';
import { watch } from 'vue';
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
const update = ref(false);

async function fetchFinanceData() {
  try {
    const res = await fetchFinance();

    financeData.value = res;
  } catch (error) {
    console.error('Error fetching finance data:', error);
  }
}

watchEffect(() => {
  loading.value = true;
  void fetchFinanceData();
  loading.value = false;
});

watch(
  () => update.value === true,
  () => {
    void updateFinance(financeData.value);
    update.value = false;
  },
  { immediate: false },
);
</script>

<template>
  <q-page v-if="!loading" class="finance-page">
    <div class="content">
      <div>
        <h3>Balance: {{ financeData.purchase.budget }} €</h3>
      </div>
      <div class="finance-cards">
        <q-card class="q-pa-md card purchase-card">
          <h4>Purchase section</h4>
          <PurchaseForm
            v-model="financeData.purchase"
            :form-data="financeData"
            @update-finance="update = true"
          />
        </q-card>
        <q-card class="q-pa-md card expenses-card">
          <h4>Expenses Section</h4>
          <ExpensesList
            v-model="financeData.expenses"
            :finance-data="financeData"
            @update-finance="update = true"
          />
        </q-card>
        <q-card class="q-pa-md card income-card">
          <h4>Income Section</h4>
          <IncomeList
            v-model="financeData.income"
            :finance-data="financeData"
            @update-finance="update = true"
          />
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<style scoped lang="scss">
.finance-page {
  display: flex;
  flex-direction: column;
  place-items: center;

  gap: 20px;
}

.content {
  width: fit-content;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.finance-cards {
  display: flex;
  place-content: center;
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
