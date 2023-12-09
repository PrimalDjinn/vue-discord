<script setup lang="ts">
import { type Server } from '@/service/server'
import { type Channel } from '@/service/channel'
import { Hash, Mic, Video, Trash, Edit, LockIcon } from 'lucide-vue-next'
import { cn } from '@/lib/utils'
import { computed, inject } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import * as channelService from '@/service/channel'
import { useServerStore } from '@/stores/server'

interface ServerChannelProps {
  channel?: Channel
  server?: Server
  role?: string
  isSectionOpen?: boolean
}
import ActionTooltip from '@/components/ActionTooltip.vue'
import { AlertDialogTrigger } from '@/components/ui/alert-dialog'
import Alert from '@/components/Alert.vue'

const { handleChannels, resetChannels } = useServerStore()

const props = defineProps<ServerChannelProps>()

const route = useRoute()
const router = useRouter()
const params = computed(() => route.params)
const refresh: any = inject('reloadServerSidebar')

import { useModal } from '@/stores/modal'

const { onOpen } = useModal()

const onAction = async () => {
  try {
    if (!props?.channel) return
    const res = await channelService.drop(props?.channel)
    if (res?.code === 0) {
      await resetChannels(props?.server?.id ?? '')
      const res2 = await channelService.find({
        serverId: props?.server?.id ?? ''
      })
      if (res?.code === 0) await handleChannels(res2?.data ?? [])
      refresh()
      // 避免待在已經刪除的 channel
      router.push(`/server/${props?.server?.id}`)
    }
  } catch (error) {
    console.error(error)
  }
}

const onClick = () => {
  router.push(`/server/${params?.value.serverId}/channel/${props?.channel?.id}`)
}

const onTrigger = (e: Event, action?: string) => {
  if (action === 'editChannel') onOpen(action, { channel: props?.channel })
  e.stopPropagation()
}
</script>

<template>
  <Alert
    :title="`刪除頻道`"
    textAlign="text-center"
    :descrption="`您確定要刪除<span class='font-semibold text-primary'>${channel?.name}</span>嗎？<br />您將無法復原此頻道。`"
    @action="onAction"
  >
    <button
      v-show="props.isSectionOpen || params?.channelId === props?.channel?.id"
      @click="onClick"
      :class="
        cn(
          'group px-2 py-2 rounded-md flex items-center w-full hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition mb-1',
          params?.channelId === props?.channel?.id && 'bg-zinc-700/20 dark:bg-zinc-700'
        )
      "
    >
      <Hash
        v-if="props?.channel?.type === 'TEXT'"
        class="mr-2 h-5 w-5 flex-shrink-0 text-zinc-500 dark:text-zinc-400"
      />
      <Mic
        v-if="props?.channel?.type === 'AUDIO'"
        class="mr-2 h-5 w-5 flex-shrink-0 text-zinc-500 dark:text-zinc-400"
      />
      <Video
        v-if="props?.channel?.type === 'VIDEO'"
        class="mr-2 h-5 w-5 flex-shrink-0 text-zinc-500 dark:text-zinc-400"
      />
      <p
        :class="
          cn(
            'line-clamp-1 font-semibold text-sm text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-800 dark:group-hover:text-zinc-300 transition',
            params?.channelId === props?.channel?.id &&
              'text-zinc-800 dark:text-zinc-200 dark:group-hover:text-white'
          )
        "
      >
        {{ props?.channel?.name }}
      </p>
      <div
        v-if="props?.channel?.name !== 'general' && props?.role !== 'GUEST'"
        class="ml-auto flex items-center gap-x-2"
      >
        <ActionTooltip label="編輯" side="top">
          <Edit
            @click="(e: Event) => onTrigger(e, 'editChannel')"
            class="hidden group-hover:block w-4 h-4 text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition"
          />
        </ActionTooltip>
        <ActionTooltip label="刪除" side="top">
          <AlertDialogTrigger @click="onTrigger">
            <Trash
              class="hidden group-hover:block w-4 h-4 text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition"
            />
          </AlertDialogTrigger>
        </ActionTooltip>
      </div>
      <LockIcon v-else class="ml-auto w-4 h-4 text-zinc-500 dark:text-zinc-400" />
    </button>
  </Alert>
</template>
