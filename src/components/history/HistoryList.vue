<script setup lang="ts">
import { type HistoryTransaction } from 'src/components/models';
import { defineProps } from 'vue';
import HistoryItem from './HistoryItem.vue';
defineProps<{
  modelValue: HistoryTransaction[];
}>();
</script>

<template>
  <q-list class="history-list">
    <HistoryItem v-for="(item, index) in modelValue" :key="index" :item />
  </q-list>
</template>

<style lang="scss" scoped>
.history-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
