<script setup lang="ts">
import { useDialogPluginComponent } from 'quasar';
import type { CarInformation } from 'src/components/models';

defineProps<{ carData: CarInformation; edit?: boolean }>();

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
    <q-card class="q-dialog-plugin">
      <h3 v-if="edit">Edit</h3>
      <q-card-section>
        <div v-for="(value, key) in carData" :key="key" class="q-mb-sm">
          <div>
            <strong>{{ key }}:</strong>
          </div>
          <div style="white-space: pre-wrap; font-family: monospace">
            {{ typeof value === 'object' ? JSON.stringify(value, null, 2) : String(value) }}
          </div>
        </div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn color="primary" label="OK" @click="onOKClick" />
        <q-btn color="primary" label="Cancel" @click="onCancelClick" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<style scoped lang="scss"></style>
