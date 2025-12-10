import { useDialogPluginComponent, useQuasar } from 'quasar';
import CarDialog from '@/dialogs/CarDialog.vue';
import type { CarInformation } from '@/types/car.types';
import CarConfrimation from 'src/dialogs/CarConfrimation.vue';
import CarFormDialog from 'src/dialogs/CarFormDialog.vue';
import GarageDialog from 'src/dialogs/GarageDialog.vue';

export function useDialog() {
  const $q = useQuasar();
  const plugin = useDialogPluginComponent();

  function openCarDialog(car?: CarInformation, edit?: boolean, market?: boolean) {
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

  function carFormDialog(car?: CarInformation, edit: boolean = false) {
    return $q.dialog({
      component: CarFormDialog,

      componentProps: {
        carData: car,
        edit,
        persistent: true,
      },
    });
  }

  function confrimationDialog(cars: CarInformation[]) {
    return $q.dialog({
      component: CarConfrimation,

      componentProps: {
        carData: cars,
        persistent: true,
      },
    });
  }

  function garageDialog() {
    return $q.dialog({
      component: GarageDialog,

      componentProps: {
        persistent: true,
      },
    });
  }

  return {
    $q,
    plugin,
    openCarDialog,
    confrimationDialog,
    carFormDialog,
    garageDialog,
  };
}
