<script setup lang="ts">
import { type Server } from '@/service/server'
import { useModal } from '@/stores/modal'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import ActionTooltip from '@/components/ActionTooltip.vue'
import { cn } from '@/lib/utils'
import { Settings, Plus, ChevronDown, ChevronRight } from 'lucide-vue-next'
const { isOpen, type, data } = storeToRefs(useModal())
const { onClose } = useModal()

const isModalOpen = computed(() => isOpen.value && type.value === 'createChannel')

const { onOpen } = useModal()

interface ServerSectionProps {
  label: string
  role?: string
  sectionType: 'channels' | 'members'
  channelType?: string
  server?: Server | null
  isSectionOpen?: boolean
}

const props = defineProps<ServerSectionProps>()
const emit = defineEmits<{
  toggle: [value: number]
}>()
</script>

<template>
  <div class="flex items-center justify-between py-2">
    <button
      v-if="sectionType === 'channels'"
      @click="
        emit('toggle', props?.channelType === 'TEXT' ? 0 : props?.channelType === 'AUDIO' ? 1 : 2)
      "
      class="group w-full text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition"
    >
      <p
        class="flex items-center text-xs uppercase font-semibold text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300"
      >
        <ChevronRight
          :class="cn('h-3 w-3 mr-1 transition-all', props.isSectionOpen && 'rotate-90')"
        />
        {{ props.label }}
      </p>
    </button>
    <p
      v-else
      class="flex items-center text-xs uppercase font-semibold text-zinc-500 dark:text-zinc-400"
    >
      {{ props.label }}
    </p>
    <ActionTooltip
      v-if="role !== 'GUEST' && sectionType === 'channels'"
      label="建立頻道"
      side="top"
    >
      <button
        @click="onOpen('createChannel', { channelType: props?.channelType, server: props.server })"
        class="text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition"
      >
        <Plus class="h-4 w-4" />
      </button>
    </ActionTooltip>
    <ActionTooltip
      v-if="role === 'ADMIN' && sectionType === 'members'"
      label="管理成員 "
      side="top"
    >
      <button
        @click="onOpen('members', { channelType: props?.channelType })"
        class="text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition"
      >
        <!-- <button
        class="text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition"
      > -->
        <Settings class="h-4 w-4" />
      </button>
    </ActionTooltip>
  </div>
</template>
