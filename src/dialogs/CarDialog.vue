<script setup lang="ts">
import { useDialogPluginComponent } from 'quasar';

const plugin = useDialogPluginComponent();

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = plugin;

function onOKClick() {
  onDialogOK();
}

function onCancelClick() {
  onDialogCancel();
}
</script>

<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card class="q-dialog-plugin">
      <q-card-actions align="right">
        <q-btn color="primary" label="OK" @click="onOKClick" />
        <q-btn color="primary" label="Cancel" @click="onCancelClick" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
