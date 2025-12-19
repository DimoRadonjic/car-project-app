import { garageService } from 'src/boot/services';
import type { CarInformation } from 'src/types/car.types';
import { ref, watch } from 'vue';

const loading = ref<boolean>(false);
const data = ref<CarInformation[]>([]);

export const useGarage = () => {
  const shouldRefetch = ref<boolean>(true);

  async function fetch(): Promise<void> {
    loading.value = true;
    try {
      const cars: CarInformation[] = await garageService.getData();

      data.value = cars;
    } catch (error) {
      console.log('Error fetching garage - useGarage', error);
    }
  }

  // add update func

  // add remove func

  watch(
    () => shouldRefetch.value,
    () => {
      if (shouldRefetch.value) {
        void fetch();
        setTimeout(() => {
          loading.value = false;
          shouldRefetch.value = false;
        }, 2000);
      }
    },
    { immediate: true },
  );

  return { data, shouldRefetch, loading, fetch };
};
