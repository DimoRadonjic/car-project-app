<script setup lang="ts">
import { putCarOnMarket } from 'src/api/cars/update';
import GarageList from 'src/components/lists/GarageList.vue';
import { useDialog } from 'src/composables/useDialog';
import type { CarInformation } from 'src/types/car.types';
import { ref, watchEffect } from 'vue';

const { plugin } = useDialog();

const { dialogRef, onDialogOK, onDialogCancel } = plugin;

const carToMarket = ref();

function handlecarToMarket(val: CarInformation) {
  carToMarket.value = val;
}

function handleOkClick(car: CarInformation) {
  void putCarOnMarket(car);
  onDialogOK(true);
}

watchEffect(() => console.log('carToMarket', carToMarket.value));
</script>

<template>
  <q-dialog ref="dialogRef">
    <q-card class="q-dialog-plugin">
      <q-card-section class="section">
        <GarageList @cars-to-market="handlecarToMarket" />
      </q-card-section>

      <q-card-actions align="center">
        <q-btn color="primary" label="Save" @click="handleOkClick(carToMarket)" />

        <q-btn color="primary" label="Cancel" @click="onDialogCancel" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<style scoped lang="scss">
.details {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
}

.info {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.info-value {
  display: flex;
  gap: 12px;
}

.value-label {
  font-weight: 800;
}

.section {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form {
  display: flex;
  gap: 20px;
}
</style>
