import { useDialogPluginComponent, useQuasar } from 'quasar';
import CarDialog from '@/dialogs/CarDialog.vue';
import type { CarInformation } from '@/types/car.types';
import CarBuyDialog from 'src/dialogs/CarBuyDialog.vue';
import CarRemovalConfrimation from 'src/dialogs/CarRemovalConfrimation.vue';
import CarFormDialog from 'src/dialogs/CarFormDialog.vue';
import GarageDialog from 'src/dialogs/GarageDialog.vue';
import CarPurchaseConfirmation from 'src/dialogs/CarPurchaseConfirmation.vue';

export function useDialog() {
  const $q = useQuasar();
  const plugin = useDialogPluginComponent();

  const { dialogRef, onDialogCancel, onDialogHide, onDialogOK } = plugin;

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

  function openCarFormDialog(car?: CarInformation, edit: boolean = false) {
    return $q.dialog({
      component: CarFormDialog,

      componentProps: {
        carData: car,
        edit,
        persistent: true,
      },
    });
  }

  function openRemovalConfrimationDialog(cars: CarInformation[]) {
    return $q.dialog({
      component: CarRemovalConfrimation,

      componentProps: {
        carData: cars,
        persistent: true,
      },
    });
  }

  function openPurchaseConfrimationDialog(cars: CarInformation) {
    return $q.dialog({
      component: CarPurchaseConfirmation,

      componentProps: {
        carData: cars,
        persistent: true,
      },
    });
  }

  function openGarageDialog() {
    return $q.dialog({
      component: GarageDialog,

      componentProps: {
        persistent: true,
      },
    });
  }

  function openCarBuyingDialog(carData: CarInformation) {
    return $q.dialog({
      component: CarBuyDialog,

      componentProps: {
        persistent: true,
        carData,
      },
    });
  }

  return {
    $q,
    plugin,
    openCarDialog,
    openRemovalConfrimationDialog,
    openCarFormDialog,
    openGarageDialog,
    openCarBuyingDialog,
    openPurchaseConfrimationDialog,
    dialogRef,
    onDialogCancel,
    onDialogHide,
    onDialogOK,
  };
}
