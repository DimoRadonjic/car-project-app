<script setup lang="ts">
import { useGarage } from 'src/composables/useGarage';
import type { TableColumn } from './data-table.types';
import DataTable from './DataTable.vue';
import type { CarInformation } from '@/types/car.types';

const { data, loading, shouldRefetch, fetch } = useGarage();

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
</script>

<template>
  <DataTable
    v-model="data"
    v-model:should-refetch="shouldRefetch"
    :columns="defaultColumns"
    title="Garage"
    row-key="id"
    view
    edit
    add
    remove
    search
    :loading
    :refetch="fetch"
  >
  </DataTable>
</template>

<style scoped></style>
