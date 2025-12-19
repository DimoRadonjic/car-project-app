<script setup lang="ts">
import type { CarInformation } from 'src/types/car.types';
import { computed, ref } from 'vue';

const data = defineModel({ required: true, default: [], type: Array<CarInformation> });

const emit = defineEmits(['cars-to-market', 'changed']);

const currentData = computed(() => data.value);

const carsChanged = ref<number>(0);

function carToMarket(carToUpdate: CarInformation) {
  data.value = data.value.map((car) => {
    if (car.id === carToUpdate.id) {
      carsChanged.value++;
      return { ...carToUpdate, onSale: !carToUpdate.onSale };
    }
    return car;
  });
  emit('changed');
  emit('cars-to-market', { ...carToUpdate, onSale: !carToUpdate.onSale });
}
</script>

<template>
  <div class="garage-list">
    <h3>Your vehicles</h3>

    <q-list class="garage-list">
      <q-item v-for="(car, i) in currentData" :key="car.id" class="item">
        <q-item-section :class="['item-section ', i < data.length - 1 ? 'border' : '']">
          <div>{{ car.make }}</div>
          <div>{{ car.model }}</div>
          <div>{{ car.year }}</div>
          <div>{{ car.onSale }}</div>

          <q-btn v-if="!car.onSale" @click="carToMarket(car)">ADD</q-btn>
          <q-btn v-else @click="carToMarket(car)">REMOVE</q-btn>
        </q-item-section>
        <q-separator />
      </q-item>
      <q-separator />
    </q-list>
    <p>Cars changed : {{ carsChanged }}</p>
  </div>
</template>

<style scoped>
.garage-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.item-section {
  display: flex;
  flex-direction: row;
  gap: 14px;
  place-content: space-between;
  place-items: center;
  padding: 14px;
}

.border {
  border-bottom: 0.5px rgba(128, 128, 128, 0.619) solid;
}
</style>
