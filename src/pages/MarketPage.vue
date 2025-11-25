<script setup lang="ts">
import { sampleCarData, type CarInformation } from 'src/components/models';
import TableComponent from 'src/components/TableComponent.vue';

const marketCars: CarInformation[] = sampleCarData.filter((car) => car.onsale && !car.sold);
</script>

<template>
  <q-page padding> <TableComponent :data="marketCars" market /></q-page>
</template>
