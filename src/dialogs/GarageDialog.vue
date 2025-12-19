<script setup lang="ts">
import { garageService } from 'src/boot/services';
import GarageList from 'src/components/lists/GarageList.vue';
import { useDialog } from 'src/composables/useDialog';
import { useGarage } from 'src/composables/useGarage';
import type { CarInformation } from 'src/types/car.types';
import { ref, watchEffect } from 'vue';

const { data } = useGarage();
const { plugin } = useDialog();

const { dialogRef, onDialogOK, onDialogCancel } = plugin;

const carToMarket = ref();

function handleCarToMarket(val: CarInformation) {
  carToMarket.value = val;
}

function handleOkClick() {
  void garageService.updateData(carToMarket.value);
  onDialogOK(true);
}

watchEffect(() => console.log('carToMarket', carToMarket.value));
</script>

<template>
  <q-dialog ref="dialogRef">
    <q-card class="q-dialog-plugin">
      <q-card-section class="section">
        <GarageList v-model="data" @cars-to-market="handleCarToMarket" />
      </q-card-section>

      <q-card-actions align="center">
        <q-btn color="primary" label="Save" @click="handleOkClick" />

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
