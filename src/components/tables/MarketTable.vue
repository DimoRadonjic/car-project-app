<script setup lang="ts">
import DataTable from './DataTable.vue';
import { marketColumns } from './columns';
import { useMarket } from 'src/composables/useMarket';

defineProps<{
  type: 'car' | 'motorcycle';
}>();

const { data, loading, shouldRefetch } = useMarket();
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
  >
  </DataTable>
</template>

<style scoped></style>
