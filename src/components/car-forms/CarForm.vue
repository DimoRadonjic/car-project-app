<script setup lang="ts">
import { computed, ref } from 'vue';
import RegistrationForm from './RegistrationForm.vue';
import type { CarInformation, CarRegistration } from '@/types/car.types';

const car = defineModel<CarInformation>({ required: true });
const carForm = ref();
const emit = defineEmits(['save', 'cancel']);
const registration = ref<CarRegistration>(car.value.registrationDetails);
const carRepairHistoryValue = computed(() =>
  car.value?.repairHistory.length ? car.value?.repairHistory.join(' ') : '',
);

async function handleSave() {
  if (await carForm.value.validate()) {
    emit('save');
  }
}

function handleCancel() {
  emit('cancel');
}

function inputRequiredValid(val: string | number) {
  return val !== null && val !== '' && val !== undefined;
}
</script>

<template>
  <q-form ref="carForm" class="form" greedy>
    <div class="inputs-wrapper">
      <div>
        <div class="base-inputs">
          <q-input
            v-model.string="car.make"
            type="text"
            label="Make"
            :rules="[(val) => inputRequiredValid(val) || 'Field required']"
          ></q-input>

          <q-input
            v-model.string="car.model"
            type="text"
            label="Model"
            :rules="[(val) => inputRequiredValid(val) || 'Field required']"
          ></q-input>

          <q-input
            v-model.number="car.year"
            type="number"
            label="Year"
            :rules="[(val) => inputRequiredValid(val) || 'Field required']"
          ></q-input>

          <q-input
            v-model.string="car.color"
            type="text"
            label="Color"
            :rules="[(val) => inputRequiredValid(val) || 'Field required']"
          ></q-input>

          <q-input v-model.number="car.mileage" type="number" label="Mileage" suffix="km"></q-input>
        </div>
        <div class="market-inputs">
          <q-checkbox v-model="car.onSale" label="On Sale"></q-checkbox>

          <div v-if="car.onSale">
            <q-input
              v-model.number="car.price"
              type="number"
              prefix="€"
              label="Price"
              :min="0"
              :rules="[
                (val: number) => inputRequiredValid(val) || 'Field required',
                (val: number) => val > 0 || 'Must be greater than 0',
              ]"
            ></q-input>

            <q-checkbox v-model="car.sold" label="Sold"></q-checkbox>
          </div>
        </div>
      </div>

      <div>
        <div class="reg-inputs">
          <RegistrationForm v-model="registration" />
        </div>

        <div class="repair-inputs">
          <q-input
            v-model="carRepairHistoryValue"
            autogrow
            type="textarea"
            label="Repair History"
          ></q-input>
          <q-checkbox
            v-model="car.furtherRepairsNeeded"
            label="Further repairs needed"
          ></q-checkbox>
        </div>
      </div>
    </div>
    <q-card-actions align="center">
      <q-btn color="primary" label="Save" @click="handleSave" />
      <q-btn color="primary" label="Cancel" @click="handleCancel" />
    </q-card-actions>
  </q-form>
</template>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
}
.inputs-wrapper {
  display: flex;
  gap: 20px;
}

.other-inputs,
.reg-inputs {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

input {
  padding: 0;
}
</style>
