import { useQuasar } from 'quasar';
import type { CarInformation } from 'src/components/models';
import CarDialog from 'src/dialogs/CarDialog.vue';

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
