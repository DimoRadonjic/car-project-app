<script setup lang="ts">
import { useDialogPluginComponent } from 'quasar';
import ExpensesForm from './ExpensesForm.vue';
import { ref } from 'vue';
import type { Expense } from 'src/types/finance.types';

const plugin = useDialogPluginComponent();

const { dialogRef, onDialogOK, onDialogCancel } = plugin;

const newExpense = ref<Expense>({
  amount: 0,
  type: 'repair',
  dueDate: new Date(),
  status: 'pending',
  id: crypto.randomUUID(),
});

function onOKClick() {
  onDialogOK(newExpense.value);
}

function onCancelClick() {
  onDialogCancel();
}
</script>

<template>
  <q-dialog ref="dialogRef">
    <q-card class="q-dialog-plugin">
      <q-card-section> <ExpensesForm v-model="newExpense" /> </q-card-section>

      <q-card-actions align="right">
        <q-btn color="primary" label="Save" @click="onOKClick" />
        <q-btn color="primary" label="Cancel" @click="onCancelClick" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
