<script setup lang="ts">
import { computed, ref } from 'vue';
import type { Expense } from '../models';
import { useQuasar } from 'quasar';
import ExpenseDialog from './ExpenseDialog.vue';
import { API_EXPENSE_URL } from 'src/api';

const $q = useQuasar();

function formatDate(dateString: Date): string {
  const date = new Date(dateString).toLocaleDateString('sr-Sr');

  return date.replaceAll('. ', '/').slice(0, -1);
}

function checkDateStatus(due: Date) {
  const now = new Date();
  const dueDate = new Date(due);

  const utcNow = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
  const utcDue = Date.UTC(dueDate.getFullYear(), dueDate.getMonth(), dueDate.getDate());

  const msPerDay = 24 * 60 * 60 * 1000;
  const dayDiff = Math.floor((utcDue - utcNow) / msPerDay);

  return function () {
    if (dayDiff < 0) return 'overdue';
    if (dayDiff >= 30) {
      const months = Math.floor(dayDiff / 30);
      return `${months} month${months > 1 ? 's' : ''}`;
    }

    return `${dayDiff} day${dayDiff !== 1 ? 's' : ''}`;
  };
}

const getDateStatus = (date: Date) => checkDateStatus(date)();

const expenses = defineModel<Expense[]>({ default: [] });

const dateItems = computed(() =>
  expenses.value.map((item) => {
    return {
      ...item,
      formattedDate: formatDate(item.dueDate),
      remaining: item.status !== 'done' ? getDateStatus(item.dueDate) : 'done',
    };
  }),
);

const totalExpensesCost = computed((): number => {
  return dateItems.value.reduce((acc, expense) => acc + expense.amount, 0);
});

const allCosts = computed((): Record<string, number> => {
  return dateItems.value.reduce<Record<string, number>>(
    (acc, expense) => {
      if (expense.status in acc || expense.remaining in acc) {
        if (expense.remaining === 'overdue') {
          acc[expense.remaining] = (acc[expense.status] as number) + expense.amount;
        }

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
  selected.value = null;
}
</script>

<template>
  <div class="expenses">
    <q-list class="expense-list" separator bordered>
      <q-item
        v-for="(expense, index) in dateItems"
        :key="index"
        clickable
        :active="selected && JSON.stringify(selected) === JSON.stringify(expense)"
        @click="selectExpense(expense)"
      >
        <q-item-section>
          <div><strong>Type:</strong> {{ expense.type }}</div>
          <div><strong>Amount:</strong> €{{ expense.amount }}</div>
          <div>
            <strong>Due Date:</strong>
            {{ expense.formattedDate }}
          </div>
        </q-item-section>

        <q-item-section side top>
          <q-item-label caption class="badges">
            <q-badge
              :class="{
                overdue: expense.remaining === 'overdue',
                done: expense.remaining === 'done',
                pending: expense.remaining !== 'done' && expense.remaining !== 'overdue',
              }"
              class="badge"
            >
              {{ expense.status === 'pending' ? expense.remaining : expense.status }}
            </q-badge>
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-list>

    <div class="expenses-costs">
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

    <div class="actions">
      <q-btn color="primary" label="Add" @click="openDialog" />
      <q-btn color="red-10" label="Remove" :disable="!selected" @click="removeExpense" />
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
