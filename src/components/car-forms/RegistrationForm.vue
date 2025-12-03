<script setup lang="ts">
import type { CarRegistration } from '../models';

const model = defineModel<CarRegistration>({ required: true });
</script>

<template>
  <div>
    <q-input
      v-model="model.registrationNumber"
      label="Registration Number"
      mask="XXX-XXX-XXX"
      :rules="[
        (val) => /^[A-Z0-9]{3}-[A-Z0-9]{3}-[A-Z0-9]{3}$/.test(val) || 'Format must be XXX-XXX-XXX',
      ]"
    />

    <q-input
      v-model="model.expiryDate"
      label="Experation date"
      mask="XXX-XXX-XXX"
      :rules="[
        (val) => /^[A-Z0-9]{3}-[A-Z0-9]{3}-[A-Z0-9]{3}$/.test(val) || 'Format must be XXX-XXX-XXX',
      ]"
    />
  </div>
</template>

<style scoped lang="scss"></style>
