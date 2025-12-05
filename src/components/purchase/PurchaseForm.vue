<script setup lang="ts">
import { useQuasar } from 'quasar';
import type { FinanceData } from 'src/types/finance.types';
import { computed, ref } from 'vue';

defineProps<{ formData: FinanceData }>();

const $q = useQuasar();

const model = defineModel<{
  budget: number;
  amountForPurchase: number;
  percentage: number;
}>({
  default: {
    budget: 0,
    amountForPurchase: 0,
    percentage: 5,
  },
});

const emit = defineEmits(['update-finance']);

const edit = ref(false);

const formComponent = ref();

const priceLimit = computed(() => {
  return Math.floor(model.value.amountForPurchase * (model.value.percentage / 100));
});

function onPurchaseSubmit() {
  if (formComponent.value.validate()) {
    // works
    // const send = { ...props.formData, purchase: model.value };

    // void updateFinance(send);

    edit.value = false;
    emit('update-finance');
  } else {
    $q.notify({
      color: 'red-5',
      textColor: 'white',
      icon: 'warning',
      message: 'You need to accept the license and terms first',
    });
  }
}
</script>

<template>
  <div class="purchase">
    <q-form
      v-if="edit"
      ref="formComponent"
      class="q-gutter-md"
      @submit.prevent.stop="onPurchaseSubmit"
    >
      <div>
        <label for="total-amount-input">Total Amount :</label>
        <q-input
          id="total-amount-input"
          key="total-amount-input"
          v-model.number="model.budget"
          bottom-slots
          filled
          type="number"
          name="total-amount-input"
          for="total-amount-input"
          mask="#"
          prefix="€"
          stack-label
          lazy-rules
        />
      </div>
      <div>
        <label for="amount-input">Amount for Purchase:</label>
        <q-input
          id="amount-input"
          key="amount-input"
          v-model.number="model.amountForPurchase"
          bottom-slots
          mask="#"
          filled
          type="number"
          name="amount-input"
          for="amount-input"
          prefix="€"
          stack-label
          lazy-rules
        />
      </div>

      <div>
        <label for="percentage-input">
          <span style="margin-right: 5px">Amount:</span>
          <span>{{ model.percentage }}%</span>
        </label>

        <q-slider
          id="percentage-input"
          key="percentage-input"
          v-model.number="model.percentage"
          name="percentage-input"
          for="percentage-input"
          :min="5"
          :max="90"
          :step="1"
          color="primary"
          thumb-label
          lazy-rules
          :rules="[
            (val: number) => val >= 5 || 'Minimum percentage is 5%',
            (val: number) => val <= 100 || 'Maximum percentage is 100%',
          ]"
        />
        <p class="hint">
          Percentage from your purchase amount for services, repairs or registration
        </p>
      </div>

      <div class="actions">
        <q-btn color="primary" label="Save" type="submit" />
        <q-btn label="Cancel" @click="edit = false" />
      </div>
    </q-form>

    <div v-else class="purchase-info">
      <div>
        <h5>
          Total Amount : <span>{{ model.budget }} €</span>
        </h5>
      </div>

      <div>
        <p>
          Amount for Purchase: <span>{{ model.amountForPurchase }} €</span>
        </p>
        <p v-if="model.amountForPurchase > model.budget" class="hint error">
          <span> Please correct amount ! </span>
          <span> Must not equal or be greater then your budget. </span>
        </p>
      </div>

      <div>
        <p>
          Percentage Amount: <span>{{ model.percentage }} %</span>
        </p>
      </div>

      <q-btn color="primary" label="Change" @click="edit = true" />
    </div>

    <div>
      <h6>Purchasing cars under : {{ priceLimit }} €</h6>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.purchase {
  display: flex;
  flex-direction: column;
  place-content: space-around;
  height: fit-content;
  gap: 40px;
}

.purchase-info {
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.error {
  color: red;
  display: flex;
  flex-direction: column;
}
</style>
