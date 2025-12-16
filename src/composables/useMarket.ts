import { fetchVehicals } from 'src/api';
import type { VehicleResponse } from 'src/api/api.types';
import type { CarInformation } from 'src/types/car.types';
import { ref, watch } from 'vue';

export const useMarket = () => {
  const marketData = ref<CarInformation[]>([]);
  const shouldRefetch = ref<boolean>(true);
  const loading = ref<boolean>(true);

  async function fetch(): Promise<void> {
    loading.value = true;
    try {
      const data: VehicleResponse = await fetchVehicals('market');

      marketData.value = data.cars;

      loading.value = false;
    } catch (error) {
      console.log('Error fetching market - useMarket', error);
      loading.value = false;
    }
  }

  watch(
    () => shouldRefetch.value,
    () => shouldRefetch.value && void fetch(),
    { immediate: true },
  );

  return { marketData, shouldRefetch, loading };
};
