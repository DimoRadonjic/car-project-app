<script setup lang="ts">
import { API_GARAGE_URL } from 'src/api';
import type { CarInformation } from 'src/components/models';
import TableComponent from 'src/components/TableComponent.vue';
import { ref, watchEffect } from 'vue';

const garage = ref<{
  cars: CarInformation[];
}>();

const loading = ref(true);

async function getGarage() {
  try {
    const res = await fetch(API_GARAGE_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await res.json();
    garage.value = data;

    console.log('data garage', data);
  } catch (error) {
    console.log(error);
  }
}

watchEffect(() => {
  loading.value = true;
  void getGarage();
  loading.value = false;
});
</script>

<template>
  <q-page padding>
    <TableComponent v-if="!loading && garage" :data="garage.cars" title="Garage" />
  </q-page>
</template>
