<script setup lang="ts">
import type { Expense } from '@/types/finance.types';
import { formatDateDDMMYYYY } from '@/utils/date.utils';
import { computed } from 'vue';

const props = defineProps<{
  expense: Expense;
}>();

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

const getDateStatus = computed(() => checkDateStatus(props.expense.dueDate));
</script>

<template>
  <q-item :key="expense.id" clickable v-bind="$attrs">
    <q-item-section>
      <div><strong>Type:</strong> {{ expense.type }}</div>
      <div><strong>Amount:</strong> €{{ expense.amount }}</div>
      <div>
        <strong>Due Date:</strong>
        {{ formatDateDDMMYYYY(expense.dueDate) }}
      </div>
    </q-item-section>

    <q-item-section side top>
      <q-item-label caption class="badges">
        <q-badge
          :class="{
            overdue: getDateStatus() === 'overdue',
            done: expense.status === 'done',
            pending: expense.status === 'pending' && getDateStatus() !== 'overdue',
          }"
          class="badge"
        >
          {{ expense.status === 'pending' ? getDateStatus() : expense.status }}
        </q-badge>
      </q-item-label>
    </q-item-section>
  </q-item>
</template>

<style lang="scss" scoped>
.badges {
  display: flex;
  flex-direction: column;
  place-items: space-between;
}

.overdue {
  background: linear-gradient(180deg, #d32f2f 0%, #761111 100%);
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
