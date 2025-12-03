<script setup lang="ts">
import EssentialLink from 'components/EssentialLink.vue';
import { routeNames } from '@/enums';
import type { EssentialLinkProps } from './link.types';

const drawerOpen = defineModel<boolean>({ default: false });

const linksList: EssentialLinkProps[] = [
  {
    title: 'Finance',
    link: routeNames.FINANCE,
    icon: '',
  },

  {
    title: 'Market',
    link: routeNames.MARKET,
    icon: '',
  },

  {
    title: 'Garage',
    link: routeNames.GARAGE,
    icon: '',
  },

  {
    title: 'History',
    link: routeNames.HISTORY,
    icon: '',
  },
];
</script>

<template>
  <q-drawer v-model="drawerOpen" show-if-above bordered>
    <q-list>
      <q-item-label header> Car Management </q-item-label>

      <EssentialLink v-for="link in linksList" :key="link.title" v-bind="link" />
    </q-list>
  </q-drawer>
</template>

<style lang="scss" scoped></style>
