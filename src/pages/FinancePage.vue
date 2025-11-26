<script setup lang="ts">
import FinanceForm from 'src/components/FinanceForm.vue';
import { ref } from 'vue';

const sampleData = ref({
  budget: 30000,
  amountForPurchase: 15000,
  percentage: 10,
});
</script>

<template>
  <q-page padding>
    <FinanceForm :finance-data="sampleData" />
  </q-page>
</template>
