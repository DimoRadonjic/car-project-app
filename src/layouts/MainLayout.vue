<script setup lang="ts">
import HeaderComponent from '@/components/HeaderComponent.vue';
import SidebarComponent from '@/components/sidebar/SidebarComponent.vue';
import { ref } from 'vue';

const leftDrawerOpen = ref(false);
</script>

<template>
  <q-layout view="lHh Lpr lFf">
    <SidebarComponent v-model="leftDrawerOpen" />

    <HeaderComponent v-model="leftDrawerOpen" />

    <q-page-container style="display: flex; place-content: center; place-items: center">
      <router-view />
    </q-page-container>
  </q-layout>
</template>
