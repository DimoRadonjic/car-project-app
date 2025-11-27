<script setup lang="ts">
// import { useQuasar } from 'quasar';
import { reactive, ref } from 'vue';
import { type Expense } from '../models';

const props = defineProps<{
  financeData: Expense;
}>();

// const $q = useQuasar();

const expense = reactive<Expense>({
  amount: props.financeData.amount ?? 0,
  type: props.financeData.type ?? 0,
  dueDate: props.financeData.dueDate ?? new Date(),
  status: props.financeData.status ?? 'pending',
});

const edit = ref(true);

const formComponent = ref();

async function onSubmit() {}

function onCancel() {}
</script>

<template>
  <div class="q-pa-md finance-forms">
    <div>
      <h4>Current car expanses</h4>
    </div>
    <div>
      <h4>Purchase section</h4>
      <q-form v-if="edit" ref="formComponent" class="q-gutter-md" @submit.prevent.stop="onSubmit">
        <div>
          <label for="price-input">Total Amount :</label>
          <q-input
            id="price-input"
            key="price-input"
            v-model.number="expense.amount"
            bottom-slots
            filled
            type="number"
            name="price-input"
            for="price-input"
            mask="#"
            prefix="€"
            stack-label
            lazy-rules
            :rules="[(val: number) => val > 0 || 'Amount must be greater than 0']"
          />
        </div>
        <div>
          <label for="type-input">Amount for Purchase:</label>
          <q-input
            id="type-input"
            key="type-input"
            v-model.string="expense.type"
            bottom-slots
            filled
            type="text"
            name="type-input"
            for="type-input"
            mask="S"
            stack-label
            lazy-rules
            :rules="[]"
          />
        </div>

        <div class="actions">
          <q-btn color="primary" label="Save" type="submit" />
          <q-btn label="Cancel" @click="onCancel" />
        </div>
      </q-form>

      <div v-else class="q-gutter-md">
        <div>
          <h5>
            Amount : <span>{{ expense.amount }} €</span>
          </h5>
        </div>

        <div>
          <p>
            Type: <span>{{ expense.type }} €</span>
          </p>
        </div>

        <div>
          <p>
            Due date: <span>{{ expense.dueDate }} %</span>
          </p>
        </div>

        <q-btn color="primary" label="Change" @click="edit = true" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
