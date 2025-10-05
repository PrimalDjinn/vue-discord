<script setup lang="ts">
import ChatHeader from '@/components/chat/ChatHeader.vue'
import ChatInput from '@/components/chat/ChatInput.vue'
import { Button } from '@/components/ui/button'
import { useServerStore } from '@/stores/server'

import { useRoute } from 'vue-router'
import { computed, onMounted, ref, watch } from 'vue'
import type { Channel } from '@/service/channel'
const route = useRoute()
const { getChannels } = useServerStore()

const serverId = computed(() => route.params.serverId as string)
const channelId = computed(() => route.params.channelId as string)
const channels = ref<Array<Channel>>([])
const channel = ref<Channel>()

onMounted(async () => {
  channels.value = await getChannels(serverId.value)
  channel.value = channels.value.find((c) => c.id === channelId.value)
})

watch([serverId, channelId], async (n) => {
  channels.value = await getChannels(n[0])
  channel.value = channels.value.find((c) => c.id === n[1])
})
</script>

<template>
  <div v-if="!route.params?.channelId" class="h-full flex flex-col dark:bg-[#313338]">
    <ChatHeader name="" :serverId="serverId ?? ''" type="channel" />
    <div class="h-full flex flex-col justify-center items-center px-4">
      <p class="font-bold text-2xl"></p>
      <p class="text-sm text-zinc-500 dark:text-zinc-400">
        
      </p>
    </div>
  </div>
  <div v-else class="h-full flex flex-col dark:bg-[#313338]">
    <ChatHeader :name="channel?.name ?? ''" :serverId="serverId ?? ''" type="channel" />
    <div class="flex-1">Message</div>
    <Button>Server Page {{ route.params?.channelId }}</Button>
    <ChatInput
      :name="channel?.name ?? ''"
      type="channel"
      apiUrl="/api/socket/messages"
      :query="{ channelId: channel?.id, serverId: channel?.serverId }"
    />
  </div>
</template>
