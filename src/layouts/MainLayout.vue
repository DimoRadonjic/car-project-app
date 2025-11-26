<script setup lang="ts">
import HeaderComponent from 'src/components/HeaderComponent.vue';
import SidebarComponent from 'src/components/SidebarComponent.vue';
import { ref } from 'vue';

const leftDrawerOpen = ref(false);
</script>

<template>
  <q-layout view="lHh Lpr lFf">
    <SidebarComponent v-model="leftDrawerOpen" />

    <HeaderComponent v-model="leftDrawerOpen" />

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
