<script setup lang="ts">
import { computed, ref } from 'vue';
import RegistrationForm from './RegistrationForm.vue';
import type { CarInformation, CarRegistration } from '@/types/car.types';

const car = defineModel<CarInformation>({ required: true });

const registration = ref<CarRegistration>(car.value.registrationDetails);
const carRepairHistoryValue = computed(() =>
  car.value?.repairHistory.length ? car.value?.repairHistory.join(' ') : '',
);

const notUsedInForm = ['id', 'onsale', 'furtherRepairsNeeded', 'onsale'];
</script>

<template>
  <q-form class="form">
    <div>
      <div v-for="(_, key) in car" :key="key" class="q-mb-sm">
        <q-input
          v-if="
            typeof car[key] !== 'boolean' &&
            typeof car[key] !== 'object' &&
            !notUsedInForm.includes(key)
          "
          v-model="car[key]"
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
