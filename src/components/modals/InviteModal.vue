<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Copy, RefreshCcw, Check } from 'lucide-vue-next'
import { VisuallyHidden } from 'radix-vue'

import { computed, ref } from 'vue'
import { useModal } from '@/stores/modal'
import { storeToRefs } from 'pinia'
import { useOrigin } from '@/lib/utils'
import * as server from '@/service/server'
import { v4 as uuidv4 } from 'uuid'
import { useServerStore } from '@/stores/server'
import { clientDB } from '@/stores/indexedDB'

const { isOpen, type, data } = storeToRefs(useModal())
const { onOpen, onClose } = useModal()
const origin = useOrigin()
const { clearServerCache, getServer } = useServerStore()

const isModalOpen = computed(() => isOpen.value && type.value === 'invite')
const inviteUrl = computed(() => `${origin}/invite/${data.value.server?.inviteCode ?? ''}`)

const isCopied = ref<boolean>(false)
const isLoading = ref<boolean>(false)

const onCopy = () => {
  isCopied.value = true
  navigator.clipboard.writeText(inviteUrl.value)
  setTimeout(() => {
    isCopied.value = false
  }, 1000)
}

const onNew = async () => {
  const oldInviteCode = data?.value.server?.inviteCode
  try {
    isLoading.value = true

    if (!data?.value.server?.inviteCode) return

    data.value.server.inviteCode = uuidv4() as string
    const res = await server.update(data?.value.server)
    if (res.code === 0) {
      await clientDB.put('servers', {
        id: data?.value.server.id ?? '',
        profileId: data?.value.server.profileId ?? '',
        name: data?.value.server.name ?? '',
        imageUrl: data?.value.server.imageUrl ?? '',
        inviteCode: data?.value.server.inviteCode ?? ''
      })

      await clearServerCache()
      onOpen('invite', { server: await getServer(data?.value.server?.id ?? '') })
    }
  } catch (error) {
    console.error(error)
    if (!data?.value.server?.inviteCode) return
    data.value.server.inviteCode = oldInviteCode
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <Dialog :open="isModalOpen" @update:open="onClose">
    <DialogContent class="p-0 overflow-hidden">
      <DialogHeader class="pt-8 px-6">
        <DialogTitle class="text-zinc text-center text-2xl font-bold">
          邀請朋友加入 {{ data.server?.name }}
        </DialogTitle>
        <VisuallyHidden asChild>
          <DialogDescription />
        </VisuallyHidden>
      </DialogHeader>
      <div class="p-6">
        <Label for="inviteCode">向好友發送伺服器連結</Label>
        <div class="flex items-center mt-2 gap-x-2">
          <Input
            :disabled="isLoading"
            class="bg-zinc-300/50 border-0 focus-visible:ring-0focus-visible:ring-offset-0 dark:bg-zinc-300/10"
            v-bind:model-value="inviteUrl"
            readonly
            type="text"
            id="inviteCode"
          />
          <Button @click="onCopy" :disabled="isLoading" size="icon">
            <Copy v-if="!isCopied" class="w-4 h-4" />
            <Check v-else class="w-4 h-4" />
          </Button>
        </div>
        <Button
          @click="onNew"
          :disabled="isLoading"
          variant="link"
          size="sm"
          class="text-xs text-zinc-500 mt-4"
        >
          重新產生邀請連結
          <RefreshCcw class="w-4 h-4 ml-2" />
        </Button>
      </div>
    </DialogContent>
  </Dialog>
</template>
