<script setup lang="ts">
const model = defineModel<boolean>({ default: false });

function toggleLeftDrawer() {
  model.value = !model.value;
}
</script>

<template>
  <q-header class="bg-transparent">
    <q-toolbar>
      <q-btn
        class="bg-primary"
        flat
        dense
        round
        icon="menu"
        aria-label="Menu"
        @click="toggleLeftDrawer"
      />
    </q-toolbar>
  </q-header>
</template>

<style lang="scss" scoped></style>
