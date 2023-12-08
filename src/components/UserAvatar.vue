<script setup lang="ts">
import { cn } from '@/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

interface UserAvatarProps {
  src?: string
  class?: string
}
const props = withDefaults(defineProps<UserAvatarProps>(), { src: '', class: '' })
</script>

<template>
  <Avatar :class="cn('h-7 w-7 md:h-10 md:w-10', props?.class)">
    <AvatarImage :src="props.src" alt="@radix-vue" />
    <AvatarFallback>CN</AvatarFallback>
  </Avatar>
</template>
