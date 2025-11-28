<script setup lang="ts">
import CarDialog from 'src/dialogs/CarDialog.vue';
import { type TableColumn, type CarInformation as TableRow } from './models';
import { useQuasar } from 'quasar';

defineProps<{ data: TableRow[]; market?: boolean }>();

const $q = useQuasar();

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
    field: (row: TableRow) => String(row.year),
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
    field: (row: TableRow) => String(row.mileage),
    format: (val: string) => `${Number(val).toLocaleString()} km`,
    sortable: true,
    sort: (a: string, b: string) => Number(a) - Number(b),
  },
  {
    name: 'onsale',
    label: 'On Sale',
    align: 'center',
    field: (row: TableRow) => (row.onsale ? 'Yes' : 'No'),
    sortable: true,
    sort: (a: string, b: string) => a.localeCompare(b),
  },

  {
    name: 'registration',
    label: 'Registration',
    align: 'left',
    field: (row: TableRow) =>
      row.registrationDetails ? row.registrationDetails.registrationNumber : 'N/A',
    sortable: true,
    sort: (a: string, b: string) => a.localeCompare(b),
  },
  {
    name: 'furtherRepairsNeeded',
    label: 'Needs Repair',
    align: 'center',
    field: (row: TableRow) => (row.furtherRepairsNeeded ? 'Yes' : 'No'),
    sortable: true,
    sort: (a: string, b: string) => a.localeCompare(b),
  },

  {
    name: 'hasBeenRepaired',
    label: 'Repaired',
    align: 'center',
    field: (row: TableRow) => (row.repairHistory && row.repairHistory.length > 0 ? 'Yes' : 'No'),
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
    field: (row: TableRow) => String(row.price),
    format: (val: string) => `€${Number(val).toLocaleString()}`,
    sortable: true,
    sort: (a: string, b: string) => Number(a) - Number(b),
  },
];

function onRowClick(row: TableRow) {
  console.log('Open dialog of row clicked:', row);

  $q.dialog({
    component: CarDialog,

    componentProps: {
      carData: row,
      persistent: true,
    },
  });
}
</script>

<template>
  <div class="q-pa-xs">
    <q-table
      color="primary"
      bordered
      title="Cars"
      :rows="data"
      :columns="market ? marketColumns : defaultColumns"
      row-key="make"
      @row-dblclick="(_, row) => onRowClick(row)"
    >
    </q-table>
  </div>
</template>

<style lang="scss" scoped></style>
