<script setup lang="ts">
import { useQuasar } from 'quasar';
import { API_PURCHASE_URL } from 'src/api';
import { computed, ref } from 'vue';

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

const edit = ref(false);

const formComponent = ref();

const priceLimit = computed(() => {
  return Math.floor(model.value.amountForPurchase * (model.value.percentage / 100));
});

async function updatePurchaseData() {
  try {
    const res = await fetch(API_PURCHASE_URL, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(model.value),
    });

    console.log('res', res);

    $q.notify({
      color: 'green-4',
      textColor: 'white',
      icon: 'cloud_done',
      message: 'Saved successfully',
    });
  } catch (error) {
    console.error('error', error);
  }
}

async function onPurchaseSubmit() {
  if (formComponent.value.validate()) {
    await updatePurchaseData();

    edit.value = false;
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
  <div class="purchase-form">
    <div>
      <h4>Purchase section</h4>
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
            :rules="[(val: number) => val > 0 || 'Amount must be greater than 0']"
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
            :rules="[
              (val: number) => val > 0 || 'Amount must be greater than 0',
              (val: number) => val < model.budget || `Amount must be less than ${model.budget}`,
            ]"
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

      <div v-else class="q-gutter-md">
        <div>
          <h5>
            Total Amount : <span>{{ model.budget }} €</span>
          </h5>
        </div>

        <div>
          <p>
            Amount for Purchase: <span>{{ model.amountForPurchase }} €</span>
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
  </div>
</template>

<style lang="scss" scoped></style>
