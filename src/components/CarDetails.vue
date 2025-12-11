<script setup lang="ts">
import type { CarInformation, CarRegistration } from 'src/types/car.types';
import { ref, computed } from 'vue';

const props = defineProps<{ carData: CarInformation }>();

const { registrationDetails, ...rest } = props.carData;

const car = ref(rest);

const registration = ref<CarRegistration>(registrationDetails);
const repairHistoryValue = computed(() =>
  car.value.repairHistory.length ? car.value.repairHistory : 'None',
);

const furtherRepairsValue = computed(() => (car.value.furtherRepairsNeeded ? 'Yes' : 'No'));
</script>

<template>
  <div>
    <h3>Car details</h3>
    <div class="details">
      <div class="info primary-info">
        <div class="info-value flex">
          <div class="value-label">Make :</div>
          <div class="value">{{ car.make }}</div>
        </div>

        <div class="info-value flex">
          <div class="value-label">Color :</div>
          <div class="value">{{ car.color }}</div>
        </div>

        <div class="info-value flex">
          <div class="value-label">Mileage :</div>
          <div class="value">{{ car.mileage }}</div>
        </div>

        <div class="info-value flex">
          <div class="value-label">Model :</div>
          <div class="value">{{ car.model }}</div>
        </div>

        <div class="info-value flex">
          <div class="value-label">Year :</div>
          <div class="value">{{ car.year }}</div>
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

      <div v-if="car.onSale" class="info market-info">
        <div class="info-value flex">
          <div class="value-label">Price :</div>
          <div class="value">{{ car.price }}</div>
        </div>

        <div class="info-value flex">
          <div class="value-label">On Sale :</div>
          <div class="value">{{ car.onSale }}</div>
        </div>

        <div class="info-value flex">
          <div class="value-label">Sold :</div>
          <div class="value">{{ car.sold }}</div>
        </div>
      </div>
      <div v-else>Not on sale</div>
    </div>
  </div>
</template>

<style scoped>
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
</style>
