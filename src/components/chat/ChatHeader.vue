<script setup lang="ts">
import { Hash } from 'lucide-vue-next'
import MobileToggle from '@/components/MobileToggle.vue'
import SocketIndicator from '@/components/SocketIndicator.vue'

interface ChatHeaderProps {
  serverId: string
  name: string
  type: 'channel' | 'conversation'
  imageUrl?: string
}
const props = defineProps<ChatHeaderProps>()
</script>

<template>
  <div
    class="text-md font-semibold px-3 flex items-center h-12 border-neutral-200 dark:border-neutral-800 border-b-2"
  >
    <MobileToggle :serverId="props.serverId" />
    <Hash v-if="props.type === 'channel'" class="w-5 h-5 text-zinc-500 dark:text-zinc-400 mr-2" />
    <p class="font-semibold text-md text-black dark:text-white">{{ props.name }}</p>
    <div class="flex ml-auto items-center">
      <SocketIndicator />
    </div>
  </div>
</template>
