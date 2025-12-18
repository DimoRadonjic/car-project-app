<script setup lang="ts">
import { useGarage } from 'src/composables/useGarage';
import DataTable from './DataTable.vue';
import { defaultColumns } from './columns';

const { data, loading, shouldRefetch } = useGarage();
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
  >
  </DataTable>
</template>

<style scoped></style>
