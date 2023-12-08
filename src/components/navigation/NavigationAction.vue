<script setup lang="ts">
import ActionTooltip from '@/components/ActionTooltip.vue'
import { useModal } from '@/stores/modal'
const { onOpen } = useModal()
</script>

<template>
  <ActionTooltip align="center" side="right" label="新增伺服器">
    <div>
      <button class="group flex item-center" @click="onOpen('createServer')">
        <div
          class="flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden items-center justify-center bg-background dark:bg-neutral-700 group-hover:bg-emerald-500"
        >
          <span class="group-hover:text-white transition text-emerald-500 text-2xl"> + </span>
        </div>
      </button>
    </div>
  </ActionTooltip>
</template>
