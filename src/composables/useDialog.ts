import { useQuasar } from 'quasar';
import CarDialog from '@/dialogs/CarDialog.vue';
import type { CarInformation } from '@/types/car.types';

export function useDialog() {
  const $q = useQuasar();

  function openCarDialog(car: CarInformation, edit: boolean = false, market: boolean = false) {
    return $q.dialog({
      component: CarDialog,

      componentProps: {
        carData: car,
        persistent: true,
        edit,
        market,
      },
    });
  }

  return {
    $q,
    openCarDialog,
  };
}
