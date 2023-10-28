<script setup lang="ts">
import { RouterView } from 'vue-router'
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
