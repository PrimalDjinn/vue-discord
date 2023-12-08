<script setup lang="ts">
import { getPosType } from '@/lib/utils'
import { Hash, Mic, Video, ShieldCheck, ShieldAlert, Search } from 'lucide-vue-next'
import { onMounted, ref, onUnmounted } from 'vue'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command'

import { VisuallyHidden } from 'radix-vue'
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { useRoute, useRouter } from 'vue-router'
interface ServerSearchProps {
  data: Array<{
    label: string
    type: 'channel' | 'member'
    data?: Array<{
      type: string
      name: string
      id: string
    }>
  }>
}
const props = defineProps<ServerSearchProps>()
const route = useRoute()
const router = useRouter()
const isModalOpen = ref<boolean>(false)

const listenCommand = (e: any) => {
  if (e.metaKey && e.key === 'k') {
    isModalOpen.value = true
    e.preventDefault()
  }
  // esc键
  if (e.key === 'Escape') {
    isModalOpen.value = false
  }
}

const onClick = ({ id, type }: { id: string; type: string }) => {
  isModalOpen.value = false
  const params = route.params
  if (type === 'member') router.push(`/server/${params?.serverId}/conversations/${id}`)
  if (type === 'channel') router.push(`/server/${params?.serverId}/channels/${id}`)
}

onMounted(() => {
  window.addEventListener('keydown', listenCommand)
})
onUnmounted(() => {
  window.removeEventListener('keydown', listenCommand)
})
</script>

<template>
  <button
    class="group px-2 py-2 rounded-md flex items-center gap-x-2 w-full hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition"
    @click="isModalOpen = true"
  >
    <Search class="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
    <p
      class="font-semibold text-sm text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition"
    >
      搜尋
    </p>
    <kbd
      class="pointer-events-none inline-flex h-5 select-none gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground ml-auto"
    >
      <span class="text-sm" v-if="getPosType() === 'mac'">⌘ </span>
      <span class="text-xs" v-else>Ctrl K</span>
      <span class="flex items-center" v-if="getPosType() === 'mac'">K</span>
    </kbd>
  </button>
  <Dialog :open="isModalOpen" @update:open="isModalOpen = false">
    <DialogContent class="p-0 overflow-hidden">
      <Command
        class="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5"
      >
        <CommandInput placeholder="搜尋頻道或伺服器成員" />
        <CommandList class="pt-2">
          <CommandEmpty> 查無結果 </CommandEmpty>

          <CommandGroup
            v-for="d in props.data"
            v-show="d?.data?.length"
            :key="d.label"
            :heading="d.label"
          >
            <CommandItem
              @click="onClick({ id: d2.id, type: d.type })"
              v-for="d2 in d.data"
              :key="d2.id"
              :value="d2.name"
            >
              <Hash v-if="d2.type === 'TEXT'" class="mr-2 h-4 w-4" />
              <Mic v-if="d2.type === 'AUDIO'" class="mr-2 h-4 w-4" />
              <Video v-if="d2.type === 'VIDEO'" class="mr-2 h-4 w-4" />
              <ShieldAlert v-if="d2.type === 'MODERATOR'" class="mr-2 h-4 w-4 text-primary" />
              <ShieldCheck v-if="d2.type === 'ADMIN'" class="mr-2 h-4 w-4 text-rose-500" />
              <span>{{ d2.name }}</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
      <VisuallyHidden class="hidden" asChild>
        <DialogTitle />
        <DialogDescription />
      </VisuallyHidden>
    </DialogContent>
  </Dialog>
  <!-- Search
    
     -->
</template>
