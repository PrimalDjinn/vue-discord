import { onMounted } from 'vue';
<script setup lang="ts">
import { onMounted } from 'vue'
import { useServerStore } from '@/stores/server'
import { storeToRefs } from 'pinia'
import { useRoute, useRouter } from 'vue-router'
import ChatHeader from '@/components/chat/ChatHeader.vue'
const { server } = storeToRefs(useServerStore())

const router = useRouter()
const route = useRoute()
onMounted(() => {
  // TODO 記錄上次訪問頻道
  if (server?.value?.channels?.length) {
    const initialChannel = server?.value.channels[0]
    router.push(`/server/${route?.params?.serverId}/channel/${initialChannel?.id}`)
  }
})
</script>

<template>
  <div v-if="!route.params?.channelId" class="h-full flex flex-col dark:bg-[#313338]">
    <ChatHeader name="無文字頻道" :serverId="''" type="channel" />
    <div class="h-full flex flex-col justify-center items-center px-4">
      <p class="font-bold text-2xl">無文字頻道</p>
      <p class="text-sm text-zinc-500 dark:text-zinc-400">
        您發現您身處於一個奇怪的地方。您沒有權限訪問任何文字頻道，或者此伺服器上沒有文字頻道。
      </p>
    </div>
  </div>
</template>
