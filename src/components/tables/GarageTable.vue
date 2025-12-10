<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import type { TableColumn } from './data-table.types';
import DataTable from './DataTable.vue';
import type { CarInformation } from '@/types/car.types';
import { APIEndPoints } from 'src/enums';
import { fetchVehicals } from 'src/api';

const data = ref<CarInformation[]>([]);

const loading = ref(true);

async function getGarage(): Promise<CarInformation[] | undefined> {
  try {
    const { cars } = await fetchVehicals(APIEndPoints.GARAGE);

    data.value = cars;

    return cars;
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
    name: 'onSale',
    label: 'On Sale',
    align: 'center',
    field: (row: CarInformation) => (row.onSale ? 'Yes' : 'No'),
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

watchEffect(() => {
  loading.value = true;
  void getGarage();
  loading.value = false;
});
</script>

<template>
  <DataTable
    v-if="!loading && data"
    v-model="data"
    :columns="defaultColumns"
    title="Garage"
    row-key="make"
    view
    edit
    add
    remove
    search
    :refetch="getGarage"
  >
  </DataTable>
</template>

<style scoped></style>
