<script setup lang="ts">
import CarForm from '@/components/car-forms/CarForm.vue';
import { ref } from 'vue';
import type { CarInformation } from '@/types/car.types';
import { formatDateDDMMYYYY } from 'src/utils/date.utils';
import { useDialog } from 'src/composables/useDialog';
import CarDetails from 'src/components/CarDetails.vue';

const props = withDefaults(
  defineProps<{ carData?: CarInformation; edit?: boolean; market?: boolean }>(),
  {
    carData: () => ({
      color: '',
      id: crypto.randomUUID(),
      make: '',
      mileage: 0,
      model: '',
      onSale: false,
      price: 0,
      registrationDetails: {
        expiryDate: formatDateDDMMYYYY(new Date()),
        registrationNumber: '',
        vinNumber: '',
      },
      repairHistory: '',
      sold: false,
      year: new Date().getFullYear(),
      furtherRepairsNeeded: false,
    }),
  },
);
const { plugin, openCarBuyingDialog } = useDialog();

const { dialogRef, onDialogOK, onDialogCancel } = plugin;

const carForm = ref<CarInformation>(JSON.parse(JSON.stringify(props.carData)));

function onOKClick() {
  if (props.edit) {
    onDialogOK(carForm.value);
    return;
  }

  onDialogOK();
}

function handleBuy() {
  onDialogCancel();
  openCarBuyingDialog(props.carData);
}

function onCancelClick() {
  onDialogCancel();
}
</script>

<template>
  <q-dialog ref="dialogRef">
    <q-card class="q-dialog-plugin">
      <q-card-section v-if="edit" class="section">
        <h3>Edit</h3>
        <CarForm v-model="carForm" @save="onOKClick" @cancel="onCancelClick" />
      </q-card-section>
      <q-card-section v-else class="section">
        <CarDetails :car-data />
        <q-card-actions v-if="market" align="center">
          <q-btn color="primary" label="Buy" @click="handleBuy" />
          <q-btn color="primary" label="Cancel" @click="onCancelClick" />
        </q-card-actions>

        <q-card-actions v-else align="center">
          <q-btn color="primary" label="OK" @click="onOKClick" />
          <q-btn color="primary" label="Cancel" @click="onCancelClick" />
        </q-card-actions>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<style scoped lang="scss"></style>
