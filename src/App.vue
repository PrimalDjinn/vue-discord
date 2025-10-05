<script setup lang="ts">
import ThemeProvider from '@/components/providers/ThemeProvider.vue'
import SocketProvider from '@/components/providers/SocketProvider.vue'
import { useReloadStore } from '@/stores/reload'
import { storeToRefs } from 'pinia'

const { isAllComponentAlive } = storeToRefs(useReloadStore())
</script>

<template>
  <ThemeProvider>
    <SocketProvider>
      <RouterView v-if="isAllComponentAlive" />
    </SocketProvider>
  </ThemeProvider>
</template>

<style scoped></style>
