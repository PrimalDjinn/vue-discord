<script setup lang="ts">
import { onMounted, ref } from 'vue'

import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'
import { UserButton } from 'vue-clerk'

import NavigationAction from '@/components/navigation/NavigationAction.vue'
import NavigationItem from '@/components/navigation/NavigationItem.vue'
import ThemeToggle from '@/components/ThemeToggle.vue'

import * as server from '@/service/server'
import { useServerStore } from '@/stores/server'
import { useAuthStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'
import type { Server } from '@/service/server'

const AfterSignOutUrl = import.meta.env.VITE_PUBLIC_AFTER_SIGN_IN_URL

const { profile } = storeToRefs(useAuthStore())
const { handleServers, resetServers, getServers } = useServerStore()

const servers = ref<Array<Server>>()

onMounted(async () => {
  try {
    // Setup 會先撈資料，如果 cache 有資料代表不用重新撈
    servers.value = await getServers()
    if (servers.value?.length > 0) return

    // 如果 cache 沒有資料代表，被更新了，要重新撈
    const res = await server.find()
    if (res?.data) {
      await resetServers()
      handleServers(res.data)
    }
  } catch (error) {
    console.error(error)
  }
})
</script>

<template>
  <div
    class="space-y-4 flex flex-col items-center h-full text-primary w-full dark:bg-[#1E1F22] bg-[#E3E5E8] py-3"
  >
    <NavigationItem :id="profile?.id" :imageUrl="profile?.imageUrl" :name="profile?.name ?? ''" />
    <Separator class="bg-zinc-300 dark:bg-zinc-700 mx-auto rounded-md !h-[2px] !w-[40px]" />
    <ScrollArea class="flex-1 w-full">
      <div v-for="server in servers" :key="server.id" class="mb-2">
        <NavigationItem :id="server.id" :imageUrl="server.imageUrl" :name="server.name ?? ''" />
      </div>

      <NavigationAction />
    </ScrollArea>
    <div class="pb-3 mt-auto flex items-center flex-col gap-y-4">
      <ThemeToggle />
      <UserButton :afterSignOutUrl="AfterSignOutUrl" />
    </div>
  </div>
</template>
