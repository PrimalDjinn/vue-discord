<script setup lang="ts">
import ChatHeader from '@/components/chat/ChatHeader.vue'
import { Button } from '@/components/ui/button'
import { useServerStore } from '@/stores/server'

import { useRoute } from 'vue-router'
import { computed, onMounted, ref, watch } from 'vue'
import type { Channel } from '@/service/channel'
const route = useRoute()
const { getChannels } = useServerStore()

const serverId = computed(() => route.params.serverId as string)
const conversationId = computed(() => route.params.conversationId as string)
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
    <ChatHeader name="無文字頻道" :serverId="serverId ?? ''" type="channel" />
    <div class="h-full flex flex-col justify-center items-center px-4">
      <p class="font-bold text-2xl">無文字頻道</p>
      <p class="text-sm text-zinc-500 dark:text-zinc-400">
        您發現您身處於一個奇怪的地方。您沒有權限訪問任何文字頻道，或者此伺服器上沒有文字頻道。
      </p>
    </div>
  </div>
  <div v-else class="h-full flex flex-col dark:bg-[#313338]">
    <ChatHeader :name="channel?.name ?? ''" :serverId="serverId ?? ''" type="channel" />
    <Button>Server Page {{ route.params?.channelId }}</Button>
  </div>
</template>
