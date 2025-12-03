<script lang="ts" setup>
import type { HistoryTransaction } from 'src/types/finance.types';
import { formatDate } from 'src/utils/date.utils';

defineProps<{ item: HistoryTransaction }>();
</script>

<template>
  <q-item v-bind="$attrs" class="history-item" clickable>
    <q-item-section>
      <q-item-label overline class="label overline"
        ><strong>Type:</strong> {{ item.category }}</q-item-label
      >

      <q-separator spaced inset />
      <q-item-label class="label"><strong>Amount:</strong> €{{ item.amount }}</q-item-label>
      <q-item-label class="label">
        <strong>Transaction Date:</strong>
        {{ formatDate(item.date) }}
      </q-item-label>
    </q-item-section>
  </q-item>
</template>

<style lang="scss" scoped>
.history-item {
  border: 1px rgba(128, 128, 128, 0.616) solid;

  border-radius: 8px;
}

.label {
  color: black;
  & > strong {
    font-weight: 600;
  }
}

strong {
  font-weight: 800;
}

.overline {
  text-transform: uppercase;
}
</style>
