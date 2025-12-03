<script setup lang="ts">
import type { Income } from 'src/types/finance.types';
import { ref } from 'vue';

const income = defineModel<Income>({
  default: {
    amount: 0,
    source: 'car sold',
    receivedDate: new Date(),
    id: '1',
    status: 'pending',
  },
});

const formComponent = ref();

const currentDate = new Date();

function optionsFn(date: string): void {
  if (new Date(date) < currentDate) income.value.status = 'recevied';
  else income.value.status = 'pending';
}

const options = ['car sold', 'other', 'parts sold'];
</script>

<template>
  <q-form ref="formComponent" class="q-gutter-md">
    <div>
      <q-select v-model="income.source" :options="options" label="Type" />
    </div>
    <div>
      <q-input
        id="type-input"
        key="type-input"
        v-model.number="income.amount"
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
      <q-date v-model="income.receivedDate" minimal @update:model-value="optionsFn" />
    </div>
  </q-form>
</template>

<style lang="scss" scoped></style>
