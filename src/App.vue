<script setup lang="ts">
import { ClerkLoaded } from 'vue-clerk'
import ThemeProvider from '@/components/providers/ThemeProvider.vue'
import SocketProvider from '@/components/providers/SocketProvider.vue'
import { nextTick, provide, ref } from 'vue'

// 重新刷新組件
const isRouterAlive = ref<boolean>(true)
const reload = () => {
  isRouterAlive.value = false
  nextTick(() => {
    isRouterAlive.value = true
  })
}
provide('reload', reload)
</script>

<template>
  <ClerkLoaded>
    <ThemeProvider>
      <SocketProvider>
        <RouterView v-if="isRouterAlive" />
      </SocketProvider>
    </ThemeProvider>
  </ClerkLoaded>
</template>

<style scoped></style>
