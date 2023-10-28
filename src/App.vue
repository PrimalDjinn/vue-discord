<script setup lang="ts">
import { ClerkLoaded } from 'vue-clerk'
import TheTheme from './components/TheTheme.vue'

import UseTheme from '@/components/UseTheme.vue'
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
