<!-- eslint-disable vue/no-v-text-v-html-on-component -->
<script setup lang="ts">
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog'

interface AlertProps {
  title?: string
  descrption?: string
  cancelText?: string
  actionText?: string
  textAlign?: string
}
const props = withDefaults(defineProps<AlertProps>(), {
  cancelText: '取消',
  actionText: '確定',
  textAlign: 'text-center'
})

const emit = defineEmits<{
  action: []
}>()
</script>
<template>
  <AlertDialog>
    <slot />
    <AlertDialogContent class="px-0 pb-0">
      <AlertDialogHeader class="p-4">
        <AlertDialogTitle
          class="text-2xl font-bold"
          :class="props?.textAlign"
          v-html="props.title"
        ></AlertDialogTitle>
        <AlertDialogDescription
          class="pt-4 pb-2"
          :class="props?.textAlign"
          v-html="props.descrption"
        >
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter class="px-6 py-4 mt-0 bg-gray-100 dark:bg-zinc-300/10">
        <AlertDialogCancel
          class="focus-visible:outline-none border-2 border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground"
          >{{ props.cancelText }}</AlertDialogCancel
        >
        <AlertDialogAction @click="emit('action')">{{ props.actionText }}</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>
