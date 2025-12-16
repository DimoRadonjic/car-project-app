<script setup lang="ts">
import { fetchVehicals } from 'src/api';
import { updateGarageCarInfo } from 'src/api/cars/update';
import type { CarInformation } from 'src/types/car.types';
import { ref, watch } from 'vue';

const data = ref<CarInformation[]>([]);
const updated = ref<boolean>(true);

const emit = defineEmits(['cars-to-market']);

async function fetchGarage(): Promise<void> {
  try {
    const { cars } = await fetchVehicals('garage');

    data.value = cars;
  } catch (error) {
    console.log('Garage list - fetch garage', error);
  }

  updated.value = false;
}

function carToMarket(carToUpdate: CarInformation) {
  const updatedArr: CarInformation[] = data.value.map((car) =>
    car.id === carToUpdate.id ? { ...car, onSale: !car.onSale } : car,
  );

  void updateGarageCarInfo(updatedArr);

  emit('cars-to-market', { ...carToUpdate, onSale: true });

  updated.value = true;
}

watch(
  () => updated.value,
  () => {
    if (updated.value) {
      void fetchGarage();
    }
  },
  {
    immediate: true,
  },
);
</script>

<template>
  <div class="garage-list">
    <h3>Your vehicles</h3>

    <q-list class="garage-list">
      <q-item v-for="(car, i) in data" :key="car.id" class="item">
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
