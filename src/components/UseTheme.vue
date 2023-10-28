<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useThemeStore } from '@/stores/theme'

const { toggleMode, changeTheme } = useThemeStore()
const { mode, theme } = storeToRefs(useThemeStore())
</script>

<template>
  <div>
    <slot :mode="mode" :theme="theme" :toggle="toggleMode" :change="changeTheme"></slot>
  </div>
</template>
