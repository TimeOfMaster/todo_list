<script setup>
import DefaultTheme from 'vitepress/theme';
import { SquareCheckBig } from 'lucide-vue-next';
</script>

<template>
  <DefaultTheme.Layout>
    <template #nav-bar-title-before>
      <SquareCheckBig class="nav-bar-icon" :size="24" />
    </template>
  </DefaultTheme.Layout>
</template>

<style>
.nav-bar-icon {
  margin-right: 8px; /* Adjust as needed for spacing */
  vertical-align: middle;
}
</style>
