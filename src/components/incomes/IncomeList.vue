<script setup lang="ts">
import { computed, ref } from 'vue';
import { useQuasar } from 'quasar';
import IncomeDialog from './IncomeDialog.vue';
import IncomeItem from './IncomeItem.vue';
import type { FinanceData, Income } from '@/types/finance.types';

const props = defineProps<{ financeData: FinanceData }>();

const $q = useQuasar();

const incomes = defineModel<Income[]>({ default: [] });

const emit = defineEmits(['update-finance']);

const totalIncomesCost = computed((): number => {
  return incomes.value.reduce((acc, income) => acc + income.amount, 0);
});

function removeSelectedIncome() {
  if (!selected.value) return;
  emit('update-finance', { ...props.financeData, incomes: incomes.value });
}

function openDialog() {
  $q.dialog({
    component: IncomeDialog,

    componentProps: {
      persistent: true,
    },
  }).onOk((e) => {
    incomes.value.push(e);
    emit('update-finance', true);
  });
}

// list functions

const selected = ref<Income | null>(null);

function selectIncome(income: Income) {
  if (selected.value && JSON.stringify(selected.value) === JSON.stringify(income)) {
    selected.value = null;
  } else {
    selected.value = income;
  }
}

function removeIncome() {
  if (!selected.value) return;
  incomes.value = incomes.value.filter((item) => item.id !== selected.value?.id);
  void removeSelectedIncome();
  if (selected.value.status === 'recevied') {
    selected.value = null;
    return;
  }
  selected.value = null;

  emit('update-finance', true);
}
</script>

<template>
  <div class="incomes">
    <q-list v-if="incomes.length" class="income-list" separator bordered>
      <IncomeItem
        v-for="income in incomes"
        :key="JSON.stringify(income)"
        :active="selected && JSON.stringify(selected) === JSON.stringify(income)"
        :income
        @click="selectIncome(income)"
      />
    </q-list>

    <div v-if="incomes.length" class="incomes-costs">
      <div class="total-cost"><strong>Total Cost:</strong> € {{ totalIncomesCost }}</div>
    </div>

    <div v-else>
      <p class="hint">No incomes data</p>
    </div>

    <div class="actions">
      <q-btn color="primary" label="Add" @click="openDialog" />
      <q-btn
        v-if="incomes.length && selected"
        color="red-10"
        label="Remove"
        :disable="!selected"
        @click="removeIncome"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.incomes-lists {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.incomes {
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.incomes-costs {
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
