<script setup lang="ts">
import { API_FINANCE_URL } from 'src/api';
import { type FinanceData } from 'src/components/models';
import PurchaseForm from 'src/components/PurchaseForm.vue';
import { ref, watchEffect } from 'vue';

const finacneData = ref<FinanceData>({
  purchase: {
    budget: 0,
    amountForPurchase: 0,
    percentage: 0,
  },
  expanse: {
    done: [],
    planned: [],
  },
  income: [],
});

async function fetchFinanceData() {
  try {
    const res = await fetch(API_FINANCE_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (res.ok) {
      finacneData.value = await res.json();
    } else {
      console.error('Failed to fetch finance data');
    }
  } catch (error) {
    console.error('Error fetching finance data:', error);
  }
}

watchEffect(() => {
  void fetchFinanceData();
});
</script>

<template>
  <q-page padding>
    <PurchaseForm :finance-data="finacneData.purchase" />
  </q-page>
</template>
