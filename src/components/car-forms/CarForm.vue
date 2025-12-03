<script setup lang="ts">
import { computed, ref, toRaw } from 'vue';
import RegistrationForm from './RegistrationForm.vue';
import type { CarInformation, CarRegistration } from 'src/types/car.types';

const car = defineModel<CarInformation>({ required: true });
const localCar = ref(structuredClone(toRaw(car.value)));

const registration = ref<CarRegistration>(localCar.value.registrationDetails);
const carRepairHistoryValue = computed(() =>
  localCar.value?.repairHistory.length ? localCar.value?.repairHistory.join(' ') : '',
);

const notUsedInForm = ['id', 'onsale', 'furtherRepairsNeeded', 'onsale'];
</script>

<template>
  <q-form class="form">
    <div>
      <div v-for="(_, key) in localCar" :key="key" class="q-mb-sm">
        <q-input
          v-if="
            typeof localCar[key] !== 'boolean' &&
            typeof localCar[key] !== 'object' &&
            !notUsedInForm.includes(key)
          "
          v-model="localCar[key]"
          :label="key"
        ></q-input>
      </div>
    </div>

    <div>
      <RegistrationForm v-model="registration" />
      <div class="q-mb-sm">
        <q-input
          v-model="carRepairHistoryValue"
          aria-placeholder="test"
          autogrow
          type="textarea"
          label="Repair History"
        ></q-input>
      </div>
    </div>
  </q-form>
</template>

<style scoped></style>
