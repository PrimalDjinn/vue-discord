<script setup lang="ts">
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

interface ActionToolipProps {
  label?: string
  side?: 'top' | 'right' | 'bottom' | 'left'
  align?: 'start' | 'center' | 'end'
}

const props = withDefaults(defineProps<ActionToolipProps>(), {
  label: '',
  side: 'right',
  align: 'center'
})
</script>

<template>
  <TooltipProvider>
    <Tooltip :delay-duration="50">
      <TooltipTrigger>
        <slot />
      </TooltipTrigger>
      <TooltipContent :side="props.side" :align="props.align">
        <p class="font-semibold text-sm capitalize">
          {{ props.label }}
        </p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
</template>
