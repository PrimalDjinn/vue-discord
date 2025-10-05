<script setup lang="ts">
import { useMiddleware } from '@/composables/middlewares'
import NavigationSidebar from '@/components/navigation/NavigationSidebar.vue'
import { useReloadStore } from '@/stores/reload'
import { storeToRefs } from 'pinia'


const { isNavAlive } = storeToRefs(useReloadStore())
</script>

<template>
  <div class="h-full container px-0">
    <div class="h-full hidden md:flex w-[72px] z-30 flex-col fixed inset-y-0">
      <NavigationSidebar v-if="isNavAlive" />
    </div>
    <main class="h-full md:pl-[72px]">
      <Suspense>
        <RouterView v-slot="{ Component }">
          <component :is="Component" />
        </RouterView>
      </Suspense>
    </main>
  </div>
</template>
