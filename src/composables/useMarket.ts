import { marketService } from 'src/boot/services';
import type { CarInformation } from 'src/types/car.types';
import { ref, watch, watchEffect } from 'vue';

const loading = ref<boolean>(false);
const data = ref<CarInformation[]>([]);

export const useMarket = () => {
  const shouldRefetch = ref<boolean>(true);

  async function fetch(): Promise<void> {
    loading.value = true;
    try {
      const cars = await marketService.getData();

      data.value = cars;
    } catch (error) {
      console.log('Error fetching market - useMarket', error);
    }
  }

  async function updateByCar(newData: CarInformation): Promise<void> {
    try {
      await marketService.updateData(newData);

      await fetch();
    } catch (error) {
      console.log('useMarket - updateByCar', error);
    }
  }

  watch(
    () => shouldRefetch.value,
    () => {
      if (shouldRefetch.value) {
        void fetch();
      }

      setTimeout(() => {
        loading.value = false;
        shouldRefetch.value = false;
      }, 2000);
    },
    { immediate: true },
  );

  watchEffect(() => console.log('data market', data.value));

  return { data, shouldRefetch, loading, fetch, updateByCar };
};
