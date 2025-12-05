<script setup lang="ts">
import HistoryList from '@/components/history/HistoryList.vue';
import { API_HISTORY_URL } from 'src/api/urls';
import { ref, watchEffect } from 'vue';

const historyExpenses = ref([]);
const historyIncome = ref([]);

async function fetchHistoryData() {
  try {
    const res = await fetch(API_HISTORY_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const { transactions: data } = await res.json();

    console.log('data', data);

    historyExpenses.value = data.filter(
      (item: { type: 'income' | 'expense' }) => item.type === 'expense',
    );
    historyIncome.value = data.filter(
      (item: { type: 'income' | 'expense' }) => item.type === 'income',
    );

    console.log('expenses', historyExpenses.value);
    console.log('incomes', historyIncome.value);
  } catch (error) {
    console.log(error);
  }
}

watchEffect(() => {
  void fetchHistoryData();
});
</script>

<template>
  <q-page padding class="history-page">
    <h3>All transactions</h3>
    <div class="cards">
      <q-card class="q-pa-md card expenses-card">
        <h4>Expenses Section</h4>
        <HistoryList :model-value="historyExpenses" />
      </q-card>
      <q-card class="q-pa-md card income-card">
        <h4>Income Section</h4>
        <HistoryList :model-value="historyIncome" />
      </q-card>
    </div>
  </q-page>
</template>

<style lang="scss" scoped>
.history-page {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.cards {
  display: flex;
  place-content: center;
  gap: 20px;

  .card {
    height: fit-content;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
}
</style>
