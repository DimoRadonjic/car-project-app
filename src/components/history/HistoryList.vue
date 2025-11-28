<script setup lang="ts">
import { type HistoryTransaction } from 'src/components/models';
import { defineProps } from 'vue';
defineProps<{
  modelValue: HistoryTransaction[];
}>();
</script>

<template>
  <q-list>
    <q-item v-for="(item, index) in modelValue" :key="index">
      <q-item-section>
        <q-item-label>{{ item.category }}</q-item-label>
        <q-item-label caption>{{ item.amount }} €</q-item-label>
        <q-item-label caption>{{ item.date }}</q-item-label>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<style lang="scss" scoped></style>
