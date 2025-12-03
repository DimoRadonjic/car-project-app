<script setup lang="ts">
import type { Expense } from '@/types/finance.types';
import { ref } from 'vue';

const expense = defineModel<Expense>({
  default: {
    amount: 0,
    type: 'repair',
    dueDate: new Date(),
    status: 'pending',
    id: '1',
  },
});

const formComponent = ref();

const currentDate = new Date();

const options = ['insurance', 'tax', 'repair', 'maintenance', 'registration', 'service'];

function optionsFn(date: string): boolean {
  return new Date(date) >= currentDate;
}
</script>

<template>
  <q-form ref="formComponent" class="q-gutter-md">
    <div>
      <q-select v-model="expense.type" :options="options" label="Type" />
    </div>
    <div>
      <q-input
        id="type-input"
        key="type-input"
        v-model.number="expense.amount"
        bottom-slots
        filled
        type="number"
        name="type-input"
        for="type-input"
        mask="#"
        prefix="€"
        stack-label
        lazy-rules
        label="Cost:"
      />
    </div>

    <div>
      <q-date v-model="expense.dueDate" minimal :options="optionsFn" />
    </div>
  </q-form>
</template>

<style lang="scss" scoped></style>
