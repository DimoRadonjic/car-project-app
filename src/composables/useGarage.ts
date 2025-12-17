import { fetchVehicals } from 'src/api';
import type { VehicleResponse } from 'src/api/api.types';
import type { CarInformation } from 'src/types/car.types';
import { ref, watch } from 'vue';

const loading = ref<boolean>(false);

export const useGarage = () => {
  const data = ref<CarInformation[]>([]);
  const shouldRefetch = ref<boolean>(true);

  async function fetch(): Promise<void> {
    loading.value = true;
    try {
      const { cars }: VehicleResponse = await fetchVehicals('garage');

      data.value = cars;
    } catch (error) {
      console.log('Error fetching garage - useGarage', error);
    }
  }

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
