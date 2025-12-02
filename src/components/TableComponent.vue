<script setup lang="ts">
import CarDialog from 'src/dialogs/CarDialog.vue';
import { type TableColumn, type CarInformation as TableRow } from './models';
import { useQuasar } from 'quasar';
import { matEdit, matSearch } from '@quasar/extras/material-icons';

const propsComp = defineProps<{ data: TableRow[]; market?: boolean; title: string }>();

const $q = useQuasar();

const actionColumns: TableColumn[] = [
  {
    name: 'view',
    label: 'View',
    align: 'center',
    field: () => '',
    sortable: true,
    sort: (a: string, b: string) => a.localeCompare(b),
  },

  {
    name: 'edit',
    label: 'Edit',
    align: 'center',
    field: () => '',
    sortable: true,
    sort: (a: string, b: string) => a.localeCompare(b),
  },
];

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

  ...actionColumns.filter((col) => col.name !== 'edit'),
];

function onRowClick(row: TableRow, edit: boolean = false) {
  console.log('Open dialog of row clicked:', row);

  console.log('row', row);

  $q.dialog({
    component: CarDialog,

    componentProps: {
      carData: row,
      persistent: true,
      edit,
      market: propsComp.market,
    },
  });
}
</script>

<template>
  <div class="q-pa-xs">
    <q-table
      v-if="!market"
      color="primary"
      bordered
      :title
      :rows="data"
      :columns="[...defaultColumns, ...actionColumns]"
      row-key="make"
      @row-dblclick="(_, row) => onRowClick(row)"
    >
      <template #body-cell-view="props">
        <q-td :props="props">
          <q-btn class="action-btn" @click="onRowClick(props.row)">
            <q-icon :name="matSearch" />
          </q-btn>
        </q-td>
      </template>

      <template #body-cell-edit="props">
        <q-td :props="props">
          <q-btn class="action-btn" @click="onRowClick(props.row, true)">
            <q-icon :name="matEdit" />
          </q-btn>
        </q-td>
      </template>
    </q-table>

    <q-table
      v-else
      color="primary"
      bordered
      :title
      :rows="data"
      :columns="marketColumns"
      row-key="make"
      @row-dblclick="(_, row) => onRowClick(row)"
    >
      <template #body-cell-view="props">
        <q-td :props="props">
          <q-btn class="action-btn" @click="onRowClick(props.row)">
            <q-icon :name="matSearch" />
          </q-btn>
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<style lang="scss" scoped>
.action-btn {
  border-radius: 999999px;
  width: fit-content;
  height: fit-content;
}
</style>
