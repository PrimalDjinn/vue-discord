<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { ScrollArea } from '@/components/ui/scroll-area'
import UserAvatar from '@/components/UserAvatar.vue'
import { AlertDialogTrigger } from '@/components/ui/alert-dialog'
import Alert from '@/components/Alert.vue'
import {
  Shield,
  ShieldCheck,
  ShieldAlert,
  ShieldQuestion,
  MoreVertical,
  Check,
  Gavel,
  Loader2
} from 'lucide-vue-next'

import { computed, ref } from 'vue'
import { storeToRefs } from 'pinia'

import { useServerStore } from '@/stores/server'
import { useModal } from '@/stores/modal'
import * as member from '@/service/member'
import type { Member } from '@/service/member'

const { handleServer, resetServer, getServer, getMembers } = useServerStore()

const { isOpen, type, data } = storeToRefs(useModal())
const { onOpen, onClose } = useModal()
const isModalOpen = computed(() => isOpen.value && type.value === 'members')
const loadingId = ref<string>('')

const mem = ref<Member>()

const onRoleChange = async (_member: Member, role: string) => {
  try {
    loadingId.value = _member?.id ?? ''
    const sId = data.value.server?.id ?? ''
    const res = await member.update({
      serverId: sId,
      id: _member?.id,
      profileId: _member?.profileId,
      role: role
    })
    if (res?.code !== 0) throw new Error(res?.msg)

    await resetServer(sId)
    await handleServer(res.data)
    onOpen('members', { server: await getServer(sId), members: await getMembers(sId) })
  } catch (error) {
    console.error(error)
  } finally {
    loadingId.value = ''
  }
}

const onConfirm = (_member: Member) => {
  mem.value = _member
}

const onKick = async () => {
  try {
    const _member = mem.value
    loadingId.value = _member?.id ?? ''
    const sId = data.value.server?.id ?? ''

    const res = await member.drop({ serverId: sId, id: _member?.id })
    if (res?.code !== 0) throw new Error(res?.msg)

    await resetServer(sId)
    await handleServer(res.data)
    onOpen('members', { server: await getServer(sId), members: await getMembers(sId) })
  } catch (error) {
    console.error(error)
  } finally {
    loadingId.value = ''
  }
}
</script>

<template>
  <Dialog :open="isModalOpen" @update:open="onClose">
    <DialogContent class="overflow-hidden">
      <DialogHeader class="pt-8 px-6">
        <DialogTitle class="text-zinc text-center text-2xl font-bold"> 管理成員 </DialogTitle>
        <DialogDescription class="text-center text-zinc-500">
          {{ data.members?.length }} 位成員
        </DialogDescription>
      </DialogHeader>
      <ScrollArea class="mt-8 max-h-[420px] pr-6">
        <Alert title="踢除成員" :descrption="`您確定要踢除${mem?.name}?`" @action="onKick">
          <div
            class="flex items-center gap-x-2 mb-6"
            v-for="member in data.members"
            :key="member?.id"
          >
            <UserAvatar :src="member?.imageUrl ?? ''" />
            <div class="flex flex-col gap-y-1">
              <div class="text-xs font-semibold flex items-center gap-x-1">
                {{ member?.name }}
                <ShieldCheck v-if="member?.role === 'MODERATOR'" class="h-4 w-4 text-primary" />
                <ShieldAlert v-else-if="member?.role === 'ADMIN'" class="h-4 w-4 text-rose-500" />
              </div>
              <p class="text-xs text-zinc-500">
                {{ member?.email }}
              </p>
            </div>
            <!-- 避免自己改自己狀態 -->
            <template
              v-if="data.server?.profileId !== member?.profileId && loadingId !== member?.id"
            >
              <div class="ml-auto">
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <MoreVertical class="h-4 w-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent side="left">
                    <DropdownMenuSub>
                      <DropdownMenuSubTrigger class="flex items-center">
                        <ShieldQuestion class="w-4 h-4 mr-2" />
                        <span>權限</span>
                      </DropdownMenuSubTrigger>
                      <DropdownMenuPortal>
                        <DropdownMenuSubContent>
                          <DropdownMenuItem @click="onRoleChange(member, 'GUEST')">
                            <Shield class="w-4 h-4 mr-2" />
                            <span>訪客</span>
                            <Check v-if="member?.role === 'GUEST'" class="w-4 h-4 ml-auto" />
                          </DropdownMenuItem>
                          <DropdownMenuItem @click="onRoleChange(member, 'MODERATOR')">
                            <ShieldCheck class="w-4 h-4 mr-2" />
                            <span>管理員</span>
                            <Check v-if="member?.role === 'MODERATOR'" class="w-4 h-4 ml-auto" />
                          </DropdownMenuItem>
                        </DropdownMenuSubContent>
                      </DropdownMenuPortal>
                    </DropdownMenuSub>
                    <DropdownMenuSeparator />
                    <AlertDialogTrigger @click="onConfirm(member)" class="w-full flex items-center">
                      <DropdownMenuItem class="w-full">
                        <Gavel class="w-4 h-4 mr-2" />
                        <span>踢除</span>
                      </DropdownMenuItem>
                    </AlertDialogTrigger>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </template>
            <Loader2
              v-show="loadingId === member?.id"
              class="animate-spin text-red ml-auto w-4 h-4"
            />
          </div>
        </Alert>
      </ScrollArea>
    </DialogContent>
  </Dialog>
</template>
