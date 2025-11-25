<script setup lang="ts">
import { type TableColumn, type CarInformation as TableRow } from './models';

const columns: TableColumn[] = [
  {
    name: 'name',
    required: true,
    label: 'Name',
    align: 'left',
    field: 'name',
    sortable: true,
    sort: (a: string, b: string) => a.localeCompare(b),
  },
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
    name: 'price',
    label: 'Price',
    align: 'right',
    field: (row: TableRow) => String(row.price),
    format: (val: string) => `$${Number(val).toLocaleString()}`,
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
    name: 'sold',
    label: 'Sold',
    align: 'center',
    field: (row: TableRow) => (row.sold ? 'Yes' : 'No'),
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
    field: (row: TableRow) => (row.repairHistory.length > 0 ? 'Yes' : 'No'),
    sortable: true,
    sort: (a: string, b: string) => a.localeCompare(b),
  },
];

const rows: TableRow[] = [
  {
    name: 'Sunset Cruiser',
    make: 'Toyota',
    model: 'Corolla',
    year: 2018,
    color: 'Red',
    mileage: 42000,
    price: 15999,
    onsale: true,
    sold: false,
    repairHistory: ['Brake pads replaced - 2019', 'Battery replaced - 2021'],
    registrationDetails: {
      registrationNumber: 'ABC-1234',
      expiryDate: '2026-07-31',
    },
    furtherRepairsNeeded: false,
  },
  {
    name: 'Midnight Runner',
    make: 'Honda',
    model: 'Civic',
    year: 2020,
    color: 'Midnight Blue',
    mileage: 18500,
    price: 18950,
    onsale: false,
    sold: false,
    repairHistory: ['Tire rotation - 2021'],
    registrationDetails: {
      registrationNumber: 'DEF-5678',
      expiryDate: '2025-03-15',
    },
  },
  {
    name: 'Green Commuter',
    make: 'Tesla',
    model: 'Model 3',
    year: 2022,
    color: 'Green',
    mileage: 7200,
    price: 32999,
    onsale: true,
    sold: false,
    repairHistory: [],
    registrationDetails: {
      registrationNumber: 'TES-3000',
      expiryDate: '2027-11-01',
    },
  },
  {
    name: 'Vintage Classic',
    make: 'Ford',
    model: 'Mustang',
    year: 1967,
    color: 'Black',
    mileage: 98000,
    price: 45000,
    onsale: false,
    sold: true,
    repairHistory: ['Engine rebuild - 2015', 'Paint job - 2018'],
    registrationDetails: null,
    furtherRepairsNeeded: true,
  },
  {
    name: 'Family Hauler',
    make: 'Kia',
    model: 'Sorento',
    year: 2016,
    color: 'Silver',
    mileage: 76000,
    price: 12900,
    onsale: true,
    sold: false,
    repairHistory: ['AC serviced - 2020', 'Rear suspension - 2022'],
    registrationDetails: {
      registrationNumber: 'KIA-9012',
      expiryDate: '2024-12-05',
    },
  },
];

function onRowClick(row: TableRow) {
  console.log('Row clicked:', row);
}
</script>

<template>
  <div class="q-pa-xs">
    <q-table color="primary" bordered title="Cars" :rows="rows" :columns="columns" row-key="name">
      <template #body="props">
        <q-tr :props="props" @click="onRowClick(props.row)">
          <q-td key="name" :props="props">
            {{ props.row.name }}
          </q-td>
          <q-td key="make" :props="props">
            {{ props.row.make }}
          </q-td>
          <q-td key="model" :props="props">
            {{ props.row.model }}
          </q-td>
          <q-td key="year" :props="props">
            {{ props.row.year }}
          </q-td>
          <q-td key="color" :props="props">
            {{ props.row.color }}
          </q-td>
          <q-td key="mileage" :props="props">
            {{ props.row.mileage }}
          </q-td>
          <q-td key="price" :props="props">
            {{ props.row.price }}
          </q-td>
          <q-td key="onsale" :props="props">
            {{ props.row.onsale ? 'Yes' : 'No' }}
          </q-td>

          <q-td key="sold" :props="props">
            {{ props.row.sold ? 'Yes' : 'No' }}
          </q-td>

          <q-td key="registration" :props="props">
            {{
              props.row.registrationDetails
                ? props.row.registrationDetails.registrationNumber
                : 'N/A'
            }}
          </q-td>

          <q-td key="furtherRepairsNeeded" :props="props">
            {{ props.row.furtherRepairsNeeded ? 'Yes' : 'No' }}
          </q-td>

          <q-td key="hasBeenRepaired" :props="props">
            {{ props.row.repairHistory.length > 0 ? 'Yes' : 'No' }}
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<style lang="scss" scoped></style>
