<script setup lang="ts">
import { API_GARAGE_URL } from 'src/api';
import TableComponent from 'src/components/TableComponent.vue';
import { ref, watchEffect } from 'vue';

const garage = ref();

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
  void getGarage();
});
</script>

<template>
  <q-page padding> <TableComponent :data="garage.cars" /> </q-page>
</template>
