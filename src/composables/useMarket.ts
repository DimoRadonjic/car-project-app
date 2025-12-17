import { fetchVehicals } from 'src/api';
import type { VehicleResponse } from 'src/api/api.types';
import { updateMarket } from 'src/api/cars/update';
import type { CarInformation } from 'src/types/car.types';
import { ref, watch, watchEffect } from 'vue';

const loading = ref<boolean>(false);
const data = ref<CarInformation[]>([]);

export const useMarket = () => {
  const shouldRefetch = ref<boolean>(true);

  async function fetch(): Promise<void> {
    console.log('fetching market');
    loading.value = true;
    try {
      const { cars }: VehicleResponse = await fetchVehicals('market');

      data.value = cars;

      console.log('fetching market new data', data.value);
    } catch (error) {
      console.log('Error fetching market - useMarket', error);
    }
  }

  async function updateByCar(newData: CarInformation): Promise<void> {
    try {
      await updateMarket(newData);

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
