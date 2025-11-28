<script setup lang="ts">
import { computed, ref } from 'vue';
import type { Expense } from '../models';
import { useQuasar } from 'quasar';
import ExpenseDialog from './ExpenseDialog.vue';
import { API_EXPENSE_URL } from 'src/api';
import ExpenseItem from './ExpenseItem.vue';

const $q = useQuasar();

const expenses = defineModel<Expense[]>({ default: [] });

const emit = defineEmits(['update-finance']);

const totalExpensesCost = computed((): number => {
  return expenses.value.reduce((acc, expense) => acc + expense.amount, 0);
});

const allCosts = computed((): Record<string, number> => {
  return expenses.value.reduce<Record<string, number>>(
    (acc, expense) => {
      if (expense.status in acc) {
        acc[expense.status] = (acc[expense.status] as number) + expense.amount;
      } else {
        acc[expense.status] = expense.amount;
      }
      return acc;
    },
    {} as Record<string, number>,
  );
});

async function addExpense(newExpense: Expense) {
  try {
    const res = await fetch(API_EXPENSE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newExpense),
    });
    console.log('res', res);
  } catch (error) {
    console.error(error);
  }
}

async function removeSelectedExpense() {
  if (!selected.value) return;
  try {
    const res = await fetch(API_EXPENSE_URL + `/${selected.value.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log('res', res);
  } catch (error) {
    console.error(error);
  }
}

function openDialog() {
  $q.dialog({
    component: ExpenseDialog,

    componentProps: {
      persistent: true,
    },
  }).onOk((e) => {
    console.log('Dialog OK with data:', e);
    expenses.value.push(e);
    void addExpense(e);
    emit('update-finance', true);
  });
}

// list functions

const selected = ref<Expense | null>(null);

function selectExpense(expense: Expense) {
  if (selected.value && JSON.stringify(selected.value) === JSON.stringify(expense)) {
    selected.value = null;
  } else {
    selected.value = expense;
  }
}

function removeExpense() {
  if (!selected.value) return;
  expenses.value = expenses.value.filter((item) => item.id !== selected.value?.id);
  void removeSelectedExpense();
  if (selected.value.status === 'done') {
    selected.value = null;
    return;
  }
  emit('update-finance', true);
}
</script>

<template>
  <div class="expenses">
    <q-list v-if="expenses.length" class="expense-list" separator bordered>
      <ExpenseItem
        v-for="expense in expenses"
        :key="JSON.stringify(expense)"
        :active="selected && JSON.stringify(selected) === JSON.stringify(expense)"
        :expense
        @click="selectExpense(expense)"
      />
    </q-list>

    <div v-if="expenses.length" class="expenses-costs">
      <div class="total-cost"><strong>Total Cost:</strong> € {{ totalExpensesCost }}</div>
      <div class="overdue-cost">
        <strong>Total Overdue Cost:</strong> € {{ allCosts['overdue'] ?? 0 }}
      </div>
      <div class="done-cost">
        <strong>Total Completed Cost:</strong> € {{ allCosts['done'] ?? 0 }}
      </div>
      <div class="pending-cost">
        <strong>Total Remaining Cost:</strong> € {{ allCosts['pending'] ?? 0 }}
      </div>
    </div>

    <div v-else>
      <p class="hint">No expenses data</p>
    </div>

    <div class="actions">
      <q-btn color="primary" label="Add" @click="openDialog" />
      <q-btn
        v-if="expenses.length && selected"
        color="red-10"
        label="Remove"
        :disable="!selected"
        @click="removeExpense"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.expenses-lists {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.expenses {
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.expenses-costs {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
