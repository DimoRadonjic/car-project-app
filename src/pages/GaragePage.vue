<script setup lang="ts">
import { sampleCarData } from 'src/components/models';
import TableComponent from 'src/components/TableComponent.vue';
</script>

<template>
  <q-page padding> <TableComponent :data="sampleCarData" /> </q-page>
</template>
