<script setup lang="ts">
import { computed, ref, toRaw } from 'vue';
import type { CarInformation } from './models';

const car = defineModel<CarInformation>({ required: true });
const localCar = ref(structuredClone(toRaw(car.value)));

const registration = ref(localCar.value.registrationDetails);
const carRepairHistoryValue = computed(() =>
  localCar.value?.repairHistory.length ? localCar.value?.repairHistory.join(' ') : '',
);

const notUsedInForm = ['id', 'onsale', 'furtherRepairsNeeded', 'onsale'];
</script>

<template>
  <q-form class="form">
    <div>
      <div v-for="(value, key) in localCar" :key="key" class="q-mb-sm">
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
      <div>
        <div v-for="(value, key) in registration" :key="key" class="q-mb-sm">
          <q-input
            v-model="registration[key]"
            :label="key"
            mask="XXX-XXX-XXX"
            :rules="[
              (val) =>
                /^[A-Z0-9]{3}-[A-Z0-9]{3}-[A-Z0-9]{3}$/.test(val) || 'Format must be XXX-XXX-XXX',
            ]"
          ></q-input>
        </div>
      </div>
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
