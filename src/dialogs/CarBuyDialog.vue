<script setup lang="ts">
import { makePurchase } from 'src/api/finance/update';
import { useDialog } from 'src/composables/useDialog';
import type { CarInformation } from 'src/types/car.types';

const props = defineProps<{ carData: CarInformation }>();

const { dialogRef, onDialogCancel, openCarDialog, openPurchaseConfrimationDialog } = useDialog();

function onOKClick() {
  const purchase = async () => {
    try {
      await makePurchase(props.carData);
      onDialogCancel();
    } catch (error) {
      console.log('Error in purchase', error);
    }
  };
  void purchase();
  openPurchaseConfrimationDialog(props.carData);
}

function onCancelClick() {
  onDialogCancel();
  openCarDialog(props.carData, false, true);
}
</script>

<template>
  <q-dialog ref="dialogRef">
    <q-card>
      <q-card-section class="card-section">
        <div class="content">
          <h4>Confirm the purchase</h4>
          <div class="car-info">
            <p>Vehicle: {{ carData.make }} {{ carData.model }} {{ carData.year }}</p>

            <p>
              Registration Number :
              {{ carData.registrationDetails.registrationNumber }}
            </p>
            <p>
              Registration vin number :
              {{ carData.registrationDetails.vinNumber }}
            </p>
          </div>
        </div>

        <q-card-actions>
          <q-btn color="primary" label="Confirm" @click="onOKClick" />
          <q-btn color="primary" label="Cancel" @click="onCancelClick" />
        </q-card-actions>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<style scoped>
.card-section {
  display: flex;
  flex-direction: column;
  place-content: center;
  place-items: center;
  gap: 20px;
}

.content {
  display: flex;
  flex-direction: column;
  place-content: center;
  place-items: center;
  gap: 14px;
}

.car-info {
  display: flex;
  flex-direction: column;
  gap: 14px;
}
</style>
