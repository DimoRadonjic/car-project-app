<script setup lang="ts">
import { computed } from 'vue';
import { type Income } from '../models';

const props = defineProps<{
  income: Income;
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
    if (dayDiff < 0) return 'received';
    if (dayDiff >= 30) {
      const months = Math.floor(dayDiff / 30);
      return `${months} month${months > 1 ? 's' : ''}`;
    }

    return `${dayDiff} day${dayDiff !== 1 ? 's' : ''}`;
  };
}

const getDateStatus = computed(() => checkDateStatus(props.income.receivedDate));
</script>

<template>
  <q-item :key="income.id" clickable v-bind="$attrs">
    <q-item-section>
      <div><strong>Type:</strong> {{ income.source }}</div>
      <div><strong>Amount:</strong> €{{ income.amount }}</div>
      <div>
        <strong>Due Date:</strong>
        {{ formatDate(income.receivedDate) }}
      </div>
    </q-item-section>

    <q-item-section side top>
      <q-item-label caption class="badges">
        <q-badge
          :class="{
            received: getDateStatus() === 'received',
            incoming: getDateStatus() !== 'received',
          }"
          class="badge"
        >
          {{ getDateStatus() }}
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

.received {
  background: linear-gradient(180deg, #388e3c 0%, #1b5e20 100%);
  box-shadow: 0 2px 6px rgba(27, 94, 32, 0.25);
}

.incoming {
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
