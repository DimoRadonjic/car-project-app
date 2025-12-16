<script setup lang="ts">
import { watchEffect } from 'vue';
import DataTable from './DataTable.vue';
import type { TableColumn } from './data-table.types';
import type { CarInformation } from '@/types/car.types';
import { useMarket } from 'src/composables/useMarket';

defineProps<{
  type: 'car' | 'motorcycle';
}>();

const { marketData: data, loading, shouldRefetch, fetch } = useMarket();

// const data = ref<CarInformation[]>();

// const loading = ref(true);

// async function fetchMarket(): Promise<CarInformation[] | undefined> {
//   try {
//     const { cars }: VehicleResponse = await fetchVehicals(APIEndPoints.MARKET);

//     data.value = cars;

//     return cars;
//   } catch (error) {
//     console.log('fetch Market - market table', error);
//   }
// }

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
    name: 'onSale',
    label: 'On Sale',
    align: 'center',
    field: (row: CarInformation) => (row.onSale ? 'Yes' : 'No'),
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
  },

  {
    name: 'hasBeenRepaired',
    label: 'Repaired',
    align: 'center',
    field: (row: CarInformation) =>
      row.repairHistory && row.repairHistory.length > 0 ? 'Yes' : 'No',
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
  console.log('should refetch - market table', shouldRefetch.value);
  console.log('loading.value - market table', loading.value);
});
</script>

<template>
  <DataTable
    v-model="data"
    v-model:should-refetch="shouldRefetch"
    :columns="marketColumns"
    :action-buttons="true"
    title="Market"
    row-key="id"
    :market="true"
    :loading
    view
    add
    search
    :refetch="fetch"
  >
  </DataTable>
</template>

<style scoped></style>
