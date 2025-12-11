<script setup lang="ts">
import { useDialogPluginComponent } from 'quasar';
import type { CarInformation } from 'src/types/car.types';

defineProps<{
  carData: CarInformation[];
}>();

const plugin = useDialogPluginComponent();

const { dialogRef, onDialogOK, onDialogCancel } = plugin;

function onOKClick() {
  onDialogOK();
}

function onCancelClick() {
  onDialogCancel();
}
</script>

<template>
  <q-dialog ref="dialogRef">
    <q-card>
      <q-card-section>
        <h3>Are you sure?</h3>
        <p>Removing {{ carData.length }} elements</p>
      </q-card-section>

      <q-card-actions align="center">
        <q-btn color="primary" label="OK" @click="onOKClick" />
        <q-btn color="primary" label="Cancel" @click="onCancelClick" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<style scoped></style>
