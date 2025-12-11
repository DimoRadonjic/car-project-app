<script setup lang="ts">
import type { CarRegistration } from '@/types/car.types';
import { isValidDate, toFormattedDate } from 'src/utils/date.utils';
import { computed } from 'vue';

const model = defineModel<CarRegistration>({ required: true });

const inputDate = computed(() => toFormattedDate(model.value.expiryDate, 'DD/MM/YYYY'));
</script>

<template>
  <div>
    <q-input
      v-model.string="model.registrationNumber"
      label="Registration Number"
      mask="XXXX-XXXX-XXXX"
      placeholder="XXXX-XXXX-XXXX"
      stack-label
      input-class="registration-number"
      :rules="[
        (val) =>
          /^[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/i.test(val.trim()) || 'Format must be XXX-XXX-XXX',
      ]"
    />

    <q-input
      v-model.string="model.vinNumber"
      label="Vin Number"
      :maxlength="17"
      stack-label
      input-class="registration-number"
      :rules="[(val) => /^[A-HJ-NPR-Z0-9]{17}$/i.test(val.trim()) || 'Format must be XXX-XXX-XXX']"
    />

    <q-input
      v-model="inputDate"
      filled
      placeholder="DD/MM/YYYY"
      mask="##/##/####"
      :rules="[(val) => isValidDate(val) || 'Date is invalid']"
    >
      <template #append>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
            <q-date v-model="model.expiryDate" mask="DD/MM/YYYY">
              <div class="row items-center justify-end">
                <q-btn v-close-popup label="Close" color="primary" flat />
              </div>
            </q-date>
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
  </div>
</template>

<style scoped lang="scss">
.registration-number {
  text-transform: uppercase;
}
</style>
