<script setup lang="ts">
import { computed } from 'vue';
import type { Expense } from '../models';

const props = defineProps<{
  items: Expense[];
}>();

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

const dateItems = computed(() =>
  props.items.map((item) => {
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
</script>

<template>
  <q-list class="expense-list">
    <q-item v-for="(expense, index) in dateItems" :key="index">
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
</template>

<style lang="scss" scoped></style>
