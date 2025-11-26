<script setup lang="ts">
import { useQuasar } from 'quasar';
import { computed, ref } from 'vue';

const props = defineProps<{
  financeData: {
    budget: number;
    amountForPurchase: number;
    percentage: number;
  };
}>();

const $q = useQuasar();

const totalAmount = ref(props.financeData.budget ?? 0);

const amountForPurchase = ref(props.financeData.amountForPurchase ?? 0);

const sliderValue = ref(props.financeData.percentage ?? 5);

const edit = ref(true);

const formComponent = ref();

const priceLimit = computed(() => {
  return amountForPurchase.value * (sliderValue.value / 100);
});

function onSubmit() {
  if (formComponent.value.validate()) {
    $q.notify({
      color: 'green-4',
      textColor: 'white',
      icon: 'cloud_done',
      message: 'Saved successfully',
    });

    console.log('Submitted', {
      amountForPurchase: amountForPurchase.value,
      sliderValue: sliderValue.value,
    });

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

function onCancel() {
  amountForPurchase.value = props.financeData.amountForPurchase;
  sliderValue.value = props.financeData.percentage;
  totalAmount.value = props.financeData.budget;
  edit.value = false;
}
</script>

<template>
  <div class="q-pa-md finance-forms">
    <div>
      <h4>Current car expanses</h4>
    </div>
    <div>
      <h4>Purchase section</h4>
      <q-form v-if="edit" ref="formComponent" class="q-gutter-md" @submit.prevent.stop="onSubmit">
        <div>
          <label for="total-amount-input">Total Amount :</label>
          <q-input
            id="total-amount-input"
            key="total-amount-input"
            v-model.number="totalAmount"
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
            v-model.number="amountForPurchase"
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
              (val: number) => val < totalAmount || `Amount must be less than ${totalAmount}`,
            ]"
          />
        </div>

        <div>
          <label for="percentage-input">
            <span style="margin-right: 5px">Amount:</span>
            <span>{{ sliderValue }}%</span>
          </label>

          <q-slider
            id="percentage-input"
            key="percentage-input"
            v-model.number="sliderValue"
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
          <q-btn label="Cancel" @click="onCancel" />
        </div>
      </q-form>

      <div v-else class="q-gutter-md">
        <div>
          <h5>
            Total Amount : <span>{{ totalAmount }} €</span>
          </h5>
        </div>

        <div>
          <p>
            Amount for Purchase: <span>{{ amountForPurchase }} €</span>
          </p>
        </div>

        <div>
          <p>
            Percentage Amount: <span>{{ sliderValue }} %</span>
          </p>
        </div>

        <q-btn color="primary" label="Change" @click="edit = true" />
      </div>

      <div>
        <h6>Purchasing cars under : {{ priceLimit }}</h6>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
