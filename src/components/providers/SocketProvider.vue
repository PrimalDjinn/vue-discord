<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useSocket } from '@/stores/socket'
import { onMounted, onUnmounted } from 'vue'
</script>

<template>
  <slot></slot>
</template>
