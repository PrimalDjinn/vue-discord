<script setup lang="ts">
import { useMiddleware } from '@/composables/middlewares'
import { useAuth } from 'vue-clerk'
const { isSignedIn } = useAuth()
// 守護路由
useMiddleware(isSignedIn.value)
</script>

<template>
  <main class="container mx-auto">
    <div class="flex items-center justify-center min-h-screen">
      <RouterView v-slot="{ Component }">
        <component :is="Component" />
      </RouterView>
    </div>
  </main>
</template>