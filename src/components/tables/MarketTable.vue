<script setup lang="ts">
import { API_MARKET_URL } from '@/api';
import { ref, watchEffect } from 'vue';
import DataTable from './DataTable.vue';
import type { TableColumn } from './data-table.types';
import type { CarInformation } from '@/types/car.types';

defineProps<{
  type: 'car' | 'motorcycle';
}>();

const data = ref<CarInformation[]>();

const loading = ref(true);

async function fetchMarket() {
  try {
    const res = await fetch(API_MARKET_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const resData: { cars: CarInformation[] } = await res.json();
    data.value = resData.cars;
    console.log('marketCars', resData);
    console.log('marketCars res', data.value);
  } catch (error) {
    console.log(error);
  }
}

const defaultColumns: TableColumn[] = [
  {
    name: 'make',
    label: 'Make',
    align: 'left',
    field: 'make',
    sortable: true,
    sort: (a: string, b: string) => a.localeCompare(b),
  },
  {
    name: 'model',
    label: 'Model',
    align: 'left',
    field: 'model',
    sortable: true,
    sort: (a: string, b: string) => a.localeCompare(b),
  },
  {
    name: 'year',
    label: 'Year',
    align: 'right',
    field: (row: CarInformation) => String(row.year),
    sortable: true,
    sort: (a: string, b: string) => Number(a) - Number(b),
  },
  {
    name: 'color',
    label: 'Color',
    align: 'left',
    field: 'color',
    sortable: true,
    sort: (a: string, b: string) => a.localeCompare(b),
  },
  {
    name: 'mileage',
    label: 'Mileage',
    align: 'right',
    field: (row: CarInformation) => String(row.mileage),
    format: (val: string) => `${Number(val).toLocaleString()} km`,
    sortable: true,
    sort: (a: string, b: string) => Number(a) - Number(b),
  },
  {
    name: 'onsale',
    label: 'On Sale',
    align: 'center',
    field: (row: CarInformation) => (row.onsale ? 'Yes' : 'No'),
    sortable: true,
    sort: (a: string, b: string) => a.localeCompare(b),
  },

  {
    name: 'registration',
    label: 'Registration',
    align: 'left',
    field: (row: CarInformation) =>
      row.registrationDetails ? row.registrationDetails.registrationNumber : 'N/A',
    sortable: true,
    sort: (a: string, b: string) => a.localeCompare(b),
  },
  {
    name: 'furtherRepairsNeeded',
    label: 'Needs Repair',
    align: 'center',
    field: (row: CarInformation) => (row.furtherRepairsNeeded ? 'Yes' : 'No'),
    sortable: true,
    sort: (a: string, b: string) => a.localeCompare(b),
  },

  {
    name: 'hasBeenRepaired',
    label: 'Repaired',
    align: 'center',
    field: (row: CarInformation) =>
      row.repairHistory && row.repairHistory.length > 0 ? 'Yes' : 'No',
    sortable: true,
    sort: (a: string, b: string) => a.localeCompare(b),
  },
];

const marketColumns: TableColumn[] = [
  ...defaultColumns,

  {
    name: 'price',
    label: 'Price',
    align: 'right',
    field: (row: CarInformation) => String(row.price),
    format: (val: string) => `€${Number(val).toLocaleString()}`,
    sortable: true,
    sort: (a: string, b: string) => Number(a) - Number(b),
  },
];

watchEffect(() => {
  loading.value = true;
  void fetchMarket();
  loading.value = false;
});
</script>

<template>
  <DataTable
    v-if="!loading && data"
    v-model="data"
    :columns="marketColumns"
    :action-buttons="true"
    title="Market"
    row-key="make"
    view
    add
    search
  >
  </DataTable>
</template>

<style scoped></style>
