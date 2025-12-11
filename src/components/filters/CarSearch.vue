<script setup lang="ts">
import type { CarInformation } from 'src/types/car.types';
import { ref, watch } from 'vue';
import { carDataFilter } from '.';

const props = defineProps<{
  data: CarInformation[];
}>();

const originalData = props.data.slice();

const searchResults = defineModel<CarInformation[]>({ type: Array<CarInformation>, default: [] });

const loadingSearch = defineModel<boolean>('loading', { type: Boolean, default: false });

const searchValue = ref<string>('');

function searchCondtion(val: CarInformation): boolean {
  if (!searchValue.value) searchValue.value = '';

  const q = searchValue.value.trim().toLowerCase();

  return val.make.toLowerCase().includes(q) || val.model.toLowerCase().includes(q);
}

function filterBySearch(data: CarInformation[]): void {
  if (searchResults.value.length > 0) {
    searchResults.value = carDataFilter(searchResults.value, searchCondtion);
  } else {
    searchResults.value = carDataFilter(data, searchCondtion);
  }
}

watch(
  () => searchValue.value,
  () => {
    loadingSearch.value = true;

    if (searchValue.value === '' || !searchValue.value) {
      searchResults.value = originalData;

      loadingSearch.value = false;

      return;
    }

    setTimeout(() => {
      filterBySearch(props.data);

      loadingSearch.value = false;
    }, 2000);
  },
);
</script>

<template>
  <q-input
    v-model="searchValue"
    :clearable="!loadingSearch"
    filled
    square
    placeholder="Search"
    :loading="loadingSearch"
  >
  </q-input>
</template>

<style scoped></style>
