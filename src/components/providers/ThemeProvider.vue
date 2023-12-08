<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useThemeStore } from '@/stores/theme'
import { onMounted } from 'vue'

const { toggleMode, changeTheme, changeBarColor } = useThemeStore()
const { mode, theme } = storeToRefs(useThemeStore())

onMounted(() => {
  changeBarColor()
})
</script>

<template>
  <div class="h-full">
    <slot :mode="mode" :theme="theme" :toggle="toggleMode" :change="changeTheme"></slot>
  </div>
</template>
