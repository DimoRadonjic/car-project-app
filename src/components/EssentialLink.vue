<script setup lang="ts">
import type { EssentialLinkProps } from './sidebar/link.types';

withDefaults(defineProps<EssentialLinkProps>(), {
  caption: '',
  link: '',
  icon: '',
  target: '',
});
</script>

<template>
  <q-item clickable tag="a" :target="target" :to="link">
    <q-item-section v-if="icon" avatar>
      <q-icon :name="icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
      <q-item-label caption>{{ caption }}</q-item-label>
    </q-item-section>
  </q-item>
</template>
