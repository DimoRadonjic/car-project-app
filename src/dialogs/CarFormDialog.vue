<script setup lang="ts">
import { useDialogPluginComponent } from 'quasar';
import CarForm from '@/components/car-forms/CarForm.vue';
import { ref, toRaw } from 'vue';
import type { CarInformation } from '@/types/car.types';
import { getCurrentDate } from 'src/utils/date.utils';

const props = withDefaults(defineProps<{ carData?: CarInformation; edit?: boolean }>(), {
  carData: () => ({
    color: '',
    id: crypto.randomUUID(),
    make: '',
    mileage: 0,
    model: '',
    onSale: false,
    price: 0,
    registrationDetails: {
      expiryDate: getCurrentDate(),
      registrationNumber: '',
      vinNumber: '',
    },
    repairHistory: [],
    sold: false,
    year: new Date().getFullYear(),
    furtherRepairsNeeded: false,
  }),
});

const plugin = useDialogPluginComponent();

const { dialogRef, onDialogOK, onDialogCancel } = plugin;

const carForm = ref<CarInformation>(structuredClone(toRaw(props.carData)));

function onSave() {
  onDialogOK(carForm.value);
}

function onCancel() {
  onDialogCancel();
}
</script>

<template>
  <q-dialog ref="dialogRef">
    <q-card class="q-dialog-plugin">
      <q-card-section class="section">
        <h3>{{ edit ? 'Edit' : 'New' }}</h3>
        <CarForm v-model="carForm" @save="onSave" @cancel="onCancel" />
      </q-card-section>
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
