<script setup lang="ts">
import * as serverService from '@/service/server'

import { ChevronDown, UserPlus, Settings, Users, PlusCircle, Trash, LogOut } from 'lucide-vue-next'
import { computed, inject, onMounted, ref, watch } from 'vue'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import Alert from '@/components/Alert.vue'
import { AlertDialogTrigger } from '@/components/ui/alert-dialog'

import { useModal } from '@/stores/modal'
import { useServerStore } from '@/stores/server'
import type { Server } from '@/service/server'
import type { Member } from '@/service/member'
const { getServer, getMembers } = useServerStore()

const { onOpen } = useModal()
const refresh: any = inject('reload')

interface ServerHeaderProps {
  serverId: string
  role?: string | null
}
const props = defineProps<ServerHeaderProps>()

const server = ref<Server>()
const members = ref<Array<Member>>([])

const isAdmin = computed(() => props.role === 'ADMIN')
const isModerator = computed(() => props.role === 'MODERATOR' || isAdmin)
const mode = ref<string>('leave')
const desc = computed(() =>
  mode.value === 'leave'
    ? `您確定要離開<span class="font-semibold text-primary">${server.value?.name}</span>嗎?<br />您將無法重新加入此伺服器，除非您被重新邀請。`
    : `您確定要刪除<span class="font-semibold text-primary">${server.value?.name}</span>嗎?<br />您將無法復原此伺服器。`
)

const handleLeaveDelete = async () => {
  try {
    if (!server.value) return
    // 不是自己的伺服器就離開，是自己的就刪除
    const res = await serverService.drop(server.value)
    if (res?.code === 0) refresh()
  } catch (error) {
    console.error(error)
  }
}

onMounted(async () => {
  server.value = await getServer(props.serverId)
  members.value = await getMembers(props.serverId)
})

watch(
  () => props.serverId,
  async (now) => {
    server.value = await getServer(now)
    members.value = await getMembers(now)
  }
)
</script>

<template>
  <Alert
    :title="`${mode === 'leave' ? '離開' : '刪除'}伺服器`"
    textAlign="text-center"
    :descrption="desc"
    @action="handleLeaveDelete"
  >
    <DropdownMenu>
      <DropdownMenuTrigger class="focus:outline-none">
        <button
          class="w-full text-md text-black dark:text-white font-semibold px-3 flex items-center h-12 border-neutral-200 dark:border-neutral-800 border-b-2 hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition"
        >
          {{ server?.name }}
          <ChevronDown class="h-5 w-5 ml-auto" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        class="w-56 text-xs font-semibold text-black dark:text-neutral-400 space-y-[2px]"
      >
        <DropdownMenuItem
          @click="onOpen('invite', { server: server })"
          v-if="isModerator"
          class="text-primary focus:text-primary font-semibold dark:text-primary px-3 py-2 text-sm cursor-pointer"
        >
          邀請其他人
          <UserPlus class="w-4 h-4 ml-auto" />
        </DropdownMenuItem>
        <template v-if="isAdmin">
          <DropdownMenuItem
            @click="onOpen('editServer', { server: server })"
            class="px-3 py-2 text-sm font-semibold cursor-pointer"
          >
            伺服器設定
            <Settings class="w-4 h-4 ml-auto" />
          </DropdownMenuItem>
          <DropdownMenuItem
            @click="onOpen('members', { server: server, members: members })"
            class="px-3 py-2 text-sm font-semibold cursor-pointer"
          >
            管理成員
            <Users class="w-4 h-4 ml-auto" />
          </DropdownMenuItem>
        </template>
        <template v-if="isModerator">
          <DropdownMenuItem
            @click="onOpen('createChannel', { server: server })"
            class="px-3 py-2 text-sm font-semibold cursor-pointer"
          >
            建立頻道
            <PlusCircle class="w-4 h-4 ml-auto" />
          </DropdownMenuItem>
          <DropdownMenuSeparator />
        </template>
        <DropdownMenuItem
          v-if="isAdmin"
          @click="mode = 'delete'"
          class="text-rose-500 focus:text-rose-500 px-3 py-2 text-sm font-semibold cursor-pointer"
        >
          <AlertDialogTrigger class="w-full flex">
            刪除伺服器
            <Trash class="w-4 h-4 ml-auto" />
          </AlertDialogTrigger>
        </DropdownMenuItem>
        <DropdownMenuItem
          v-if="!isAdmin"
          @click="mode = 'leave'"
          class="text-rose-500 focus:text-rose-500 px-3 py-2 text-sm font-semibold cursor-pointer"
        >
          <AlertDialogTrigger class="w-full flex">
            離開伺服器
            <LogOut class="w-4 h-4 ml-auto" />
          </AlertDialogTrigger>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </Alert>
</template>
