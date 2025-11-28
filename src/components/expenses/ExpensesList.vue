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

const emit = defineEmits(['update-finance']);

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
        v-if="expenses.length"
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

.badges {
  display: flex;
  flex-direction: column;
  place-items: space-between;
}

.overdue {
  background: linear-gradient(180deg, #d32f2f 0%, #b71c1c 100%);
  box-shadow: 0 2px 6px rgba(183, 28, 28, 0.25);
}

.done {
  background: linear-gradient(180deg, #388e3c 0%, #1b5e20 100%);
  box-shadow: 0 2px 6px rgba(27, 94, 32, 0.25);
}

.pending {
  background: linear-gradient(180deg, #33779b 0%, #214b72 100%);
  box-shadow: 0 2px 6px rgba(27, 94, 32, 0.25);
}

.badge {
  color: #fff;
  padding: 8px 8px;
  border-radius: 6px;
  font-weight: 700;
  border: 1px solid rgba(0, 0, 0, 0.12);
  letter-spacing: 0.4px;
  text-align: center;

  &:hover {
    cursor: default;
  }
}
</style>
