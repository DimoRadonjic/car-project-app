<script setup lang="ts">
import { useDialogPluginComponent } from 'quasar';
import CarForm from '@/components/car-forms/CarForm.vue';
import { computed, ref, toRaw } from 'vue';
import type { CarInformation, CarRegistration } from '@/types/car.types';
import { formatDate } from 'src/utils/date.utils';

const props = withDefaults(
  defineProps<{ carData?: CarInformation; edit?: boolean; market?: boolean }>(),
  {
    carData: () => ({
      color: '',
      id: crypto.randomUUID(),
      make: '',
      mileage: 0,
      model: '',
      onsale: false,
      price: 0,
      registrationDetails: {
        expiryDate: formatDate(new Date()),
        registrationNumber: 'XXXX-XXXX-XXXX',
      },
      repairHistory: [],
      sold: false,
      year: new Date().getFullYear(),
      furtherRepairsNeeded: false,
    }),
  },
);

const plugin = useDialogPluginComponent();

const { dialogRef, onDialogOK, onDialogCancel } = plugin;

const carForm = ref<CarInformation>(structuredClone(toRaw(props.carData)));

const { registrationDetails, ...rest } = props.carData;

const carInfo = ref(rest);

const registration = ref<CarRegistration>(registrationDetails);

function onOKClick() {
  if (props.edit) {
    onDialogOK(carForm.value);
    return;
  }
  onDialogOK();
}

function onCancelClick() {
  onDialogCancel();
}
const repairHistoryValue = computed(() =>
  carInfo.value.repairHistory.length ? carInfo.value.repairHistory.join(' ') : 'None',
);

const furtherRepairsValue = computed(() => (carInfo.value.furtherRepairsNeeded ? 'Yes' : 'No'));
</script>

<template>
  <q-dialog ref="dialogRef">
    <q-card class="q-dialog-plugin">
      <q-card-section v-if="edit" class="section">
        <h3>Edit</h3>
        <CarForm v-model="carForm" />
      </q-card-section>
      <q-card-section v-else class="section">
        <h3>Car details</h3>
        <div class="details">
          <div class="info primary-info">
            <div class="info-value flex">
              <div class="value-label">Make :</div>
              <div class="value">{{ carInfo.make }}</div>
            </div>

            <div class="info-value flex">
              <div class="value-label">Color :</div>
              <div class="value">{{ carInfo.color }}</div>
            </div>

            <div class="info-value flex">
              <div class="value-label">Mileage :</div>
              <div class="value">{{ carInfo.mileage }}</div>
            </div>

            <div class="info-value flex">
              <div class="value-label">Model :</div>
              <div class="value">{{ carInfo.model }}</div>
            </div>

            <div class="info-value flex">
              <div class="value-label">Year :</div>
              <div class="value">{{ carInfo.year }}</div>
            </div>
          </div>

          <div class="info reg-info">
            <div class="info-value flex">
              <div class="value-label">Registartion Number:</div>
              <div class="value">{{ registration.registrationNumber }}</div>
            </div>

            <div class="info-value flex">
              <div class="value-label">Expiry Date :</div>
              <div class="value">{{ registration.expiryDate }}</div>
            </div>
          </div>

          <div class="info repair-info">
            <div class="info-value flex">
              <div class="value-label">Further Repairs Needed:</div>
              <div class="value">{{ furtherRepairsValue }}</div>
            </div>

            <div class="info-value flex">
              <div class="value-label">Repair History:</div>
              <div class="value">
                {{ repairHistoryValue }}
              </div>
            </div>
          </div>

          <div v-if="carInfo.onsale" class="info market-info">
            <div class="info-value flex">
              <div class="value-label">Price :</div>
              <div class="value">{{ carInfo.price }}</div>
            </div>

            <div class="info-value flex">
              <div class="value-label">On Sale :</div>
              <div class="value">{{ carInfo.onsale }}</div>
            </div>

            <div class="info-value flex">
              <div class="value-label">Sold :</div>
              <div class="value">{{ carInfo.sold }}</div>
            </div>
          </div>
          <div v-else>Not on sale</div>
        </div>
      </q-card-section>

      <q-card-actions v-if="market" align="center">
        <q-btn color="primary" label="Buy" @click="onOKClick" />
        <q-btn color="primary" label="Cancel" @click="onCancelClick" />
      </q-card-actions>

      <q-card-actions v-if="edit" align="center">
        <q-btn color="primary" label="Save" @click="onOKClick" />
        <q-btn color="primary" label="Cancel" @click="onCancelClick" />
      </q-card-actions>

      <q-card-actions v-else align="center">
        <q-btn color="primary" label="OK" @click="onOKClick" />
        <q-btn color="primary" label="Cancel" @click="onCancelClick" />
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
