<script setup lang="ts">
import { ClerkLoaded } from 'vue-clerk'
import TheTheme from './components/theme/TheTheme.vue'
import UseTheme from '@/components/theme/UseTheme.vue'
</script>

<template>
  <ClerkLoaded>
    <UseTheme>
      <TheTheme />
      <RouterView />
    </UseTheme>
  </ClerkLoaded>
</template>

<style scoped></style>
