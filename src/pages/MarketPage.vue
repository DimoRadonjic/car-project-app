<script setup lang="ts">
import { API_MARKET_URL } from 'src/api';
import { type CarInformation } from 'src/components/models';
import TableComponent from 'src/components/TableComponent.vue';
import { ref, watchEffect } from 'vue';

const marketCars = ref<CarInformation[]>();

const loading = ref(true);

async function fetchMarket() {
  try {
    const res = await fetch(API_MARKET_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await res.json();
    marketCars.value = data.cars;
    console.log('marketCars', data);
    console.log('marketCars res', marketCars.value);
  } catch (error) {
    console.log(error);
  }
}

watchEffect(() => {
  loading.value = true;
  void fetchMarket();
  loading.value = false;
});
</script>

<template>
  <q-page padding>
    <TableComponent v-if="!loading && marketCars" :data="marketCars" market title="Market" />
  </q-page>
</template>
