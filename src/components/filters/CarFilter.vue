<script setup lang="ts">
import type { CarInformation } from 'src/types/car.types';
import { getCurrentDate } from 'src/utils/date.utils';
import { ref, watch } from 'vue';
import { carDataFilter } from '.';

const props = defineProps<{
  data: CarInformation[];
}>();

const originalData = props.data.slice();

const defaultFilterValues: Omit<CarInformation, 'id'> = {
  color: '',
  make: '',
  mileage: 0,
  model: '',
  onSale: false,
  price: 0,
  registrationDetails: { expiryDate: getCurrentDate(), registrationNumber: '', vinNumber: '' },
  repairHistory: [],
  sold: false,
  year: 0,
  furtherRepairsNeeded: false,
};

const filters = ref<Omit<CarInformation, 'id'>>(defaultFilterValues);

const filterResults = defineModel<CarInformation[]>({ type: Array<CarInformation>, default: [] });
const loadingFilter = defineModel<boolean>('loading', { type: Boolean, default: false });

function isFilterEmpty(): boolean {
  const { registrationDetails, repairHistory, ...rest } = defaultFilterValues;

  //filter repair history if empty or not empty
  if (repairHistory.length !== filters.value.repairHistory.length) return false;

  // filter options for registration - expired, does not have and registered
  if (JSON.stringify(registrationDetails) !== JSON.stringify(filters.value.registrationDetails))
    return false;

  return Object.values(rest).every((val) => val === '' || val === 0 || val === false);
}

function yearCondition(val: CarInformation): boolean {
  return val.year >= filters.value.year;
}

function onSaleCondition(val: CarInformation): boolean {
  return val.onSale === true;
}

function needsRepairsCondition(val: CarInformation): boolean {
  return val.furtherRepairsNeeded === false;
}

function filterByOnSale(data: CarInformation[]): CarInformation[] {
  let result: CarInformation[];

  if (filterResults.value.length > 0) {
    result = carDataFilter(filterResults.value, onSaleCondition);
  } else {
    result = carDataFilter(data, onSaleCondition);
  }

  return result;
}

function filterByFurtherRepairsNeeded(data: CarInformation[]): CarInformation[] {
  let result: CarInformation[];

  if (filterResults.value.length > 0) {
    result = carDataFilter(filterResults.value, needsRepairsCondition);
  } else {
    result = carDataFilter(data, needsRepairsCondition);
  }

  return result;
}

function filterByYear(data: CarInformation[]): CarInformation[] {
  let result: CarInformation[];

  if (filterResults.value.length > 0) {
    result = carDataFilter(filterResults.value, yearCondition);
  } else {
    result = carDataFilter(data, yearCondition);
  }

  return result;
}

function carFilterData(): () => void {
  const data = props.data.slice();
  console.log('filters.value', filters.value);

  return () => {
    if (filters.value.year !== 0) {
      filterResults.value = filterByYear(data);
    }

    if (filters.value.onSale) {
      filterResults.value = filterByOnSale(data);
    }

    if (filters.value.furtherRepairsNeeded) {
      filterResults.value = filterByFurtherRepairsNeeded(data);
    }
  };
}

watch(
  () => [
    filters.value.furtherRepairsNeeded,
    filters.value.onSale,
    filters.value.year,
    filters.value.price,
    filters.value.sold,
    filters.value.repairHistory,
  ],
  () => {
    loadingFilter.value = true;

    if (isFilterEmpty()) {
      filterResults.value = originalData;

      loadingFilter.value = false;

      return;
    }

    setTimeout(() => {
      carFilterData()();
      loadingFilter.value = false;
    }, 2000);
  },
);
</script>

<template>
  <div class="filter">
    <q-checkbox v-model="filters.onSale" label="On Sale" />
    <q-checkbox v-model="filters.furtherRepairsNeeded" label="Does not need repairs" />
    <q-input
      v-model.number="filters.year"
      :clearable="!loadingFilter && filters.year !== 0"
      type="number"
      mask="####"
      filled
      square
      placeholder="From Year"
      label="Make year"
      :loading="loadingFilter"
    >
    </q-input>
  </div>
</template>

<style scoped>
.filter {
  display: flex;
  gap: 12px;
}
</style>
