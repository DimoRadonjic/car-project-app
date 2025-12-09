<script setup lang="ts">
import HistoryItem from './HistoryItem.vue';
import type { HistoryTransaction } from '@/types/finance.types';

defineProps<{
  data: HistoryTransaction[];
}>();
</script>

<template>
  <q-list class="history-list">
    <HistoryItem v-for="item in data" :key="item.id" :item />
  </q-list>
</template>

<style lang="scss" scoped>
.history-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
