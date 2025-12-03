<script setup lang="ts">
import { useDialogPluginComponent } from 'quasar';
import { ref } from 'vue';
import IncomeForm from './IncomeForm.vue';
import type { Income } from '@/types/finance.types';

const plugin = useDialogPluginComponent();

const { dialogRef, onDialogOK, onDialogCancel } = plugin;

const newIncome = ref<Income>({
  amount: 0,
  source: 'car sold',
  receivedDate: new Date(),
  id: crypto.randomUUID(),
  status: 'pending',
});

function onOKClick() {
  onDialogOK(newIncome.value);
}

function onCancelClick() {
  onDialogCancel();
}
</script>

<template>
  <q-dialog ref="dialogRef">
    <q-card class="q-dialog-plugin">
      <q-card-section> <IncomeForm v-model="newIncome" /> </q-card-section>

      <q-card-actions align="right">
        <q-btn color="primary" label="Save" @click="onOKClick" />
        <q-btn color="primary" label="Cancel" @click="onCancelClick" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
