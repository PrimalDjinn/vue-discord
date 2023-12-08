<script setup lang="ts">
import ActionTooltip from '@/components/ActionTooltip.vue'
import { cn } from '@/lib/utils'
import { useRoute, useRouter } from 'vue-router'

interface Props {
  id: string
  imageUrl: string
  name: string
}

const props = withDefaults(defineProps<Props>(), {
  id: '',
  imageUrl: '',
  name: ''
})

const route = useRoute()
const router = useRouter()

// 點擊跳轉伺服器
const handleClick = (serverId: string) => {
  router.push(`/server/${serverId}`)
}
</script>

<template>
  <ActionTooltip align="center" side="right" :label="props.name">
    <button @click="handleClick(props.id)" class="group relative flex items-center">
      <div
        :class="
          cn(
            'absolute left-0 bg-primary rounded-r-full transition-all w-[4px]',
            route.params?.serverId !== props.id && 'group-hover:h-[20px]',
            route.params?.serverId === props.id ? 'h-[36px]' : 'h-[8px]'
          )
        "
      />
      <div
        :class="
          cn(
            'relative group flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden',
            route.params?.serverId === props.id && 'bg-primary/10 text-primary rounded-[16px]'
          )
        "
      >
        <img :src="props.imageUrl" :alt="props.name" />
      </div>
    </button>
  </ActionTooltip>
</template>
