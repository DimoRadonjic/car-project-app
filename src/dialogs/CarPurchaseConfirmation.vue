<script setup lang="ts">
import { useDialog } from 'src/composables/useDialog';
import { useMarket } from 'src/composables/useMarket';
import type { CarInformation } from 'src/types/car.types';
import { onMounted, ref } from 'vue';

const props = defineProps<{
  carData: CarInformation;
}>();

const { dialogRef, onDialogCancel } = useDialog();

const { updateByCar } = useMarket();

const isFinished = ref<boolean>(false);

setTimeout(() => {
  isFinished.value = true;

  setTimeout(() => onDialogCancel(), 1000);
}, 2000);

onMounted(() => {
  void updateByCar(props.carData);
});
</script>

<template>
  <q-dialog ref="dialogRef">
    <q-card>
      <q-card-section class="card-section">
        <div class="content">
          <h4>Thank you for the confirmation !</h4>
          <transition name="fade-scale" mode="out-in">
            <q-circular-progress
              v-if="!isFinished"
              key="loader"
              indeterminate
              rounded
              size="50px"
              color="primary"
              class="q-ma-md"
            />

            <q-icon
              v-else
              key="check"
              class="check_circle"
              name="check_circle"
              color="green"
              size="80px"
            />
          </transition>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<style scoped>
.card-section,
.content {
  display: flex;
  flex-direction: column;
  place-content: center;
  place-items: center;
  gap: 20px;
}

.fade-scale-enter-active,
.fade-scale-leave-active {
  transition: all 0.25s ease;
}

.fade-scale-enter-from,
.fade-scale-leave-to {
  opacity: 0;
  transform: scale(0.6);
}
</style>
