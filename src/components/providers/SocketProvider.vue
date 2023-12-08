<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useSocket } from '@/stores/socket'
import { onMounted, onUnmounted } from 'vue'

const { onOpenSocketIO, onCloseSocketIO } = useSocket()
const { socketInstance } = storeToRefs(useSocket())

onMounted(() => {
  onOpenSocketIO()
})

onUnmounted(() => {
  onCloseSocketIO()
})
</script>

<template>
  <slot :socket="socketInstance.socket" :isConnected="socketInstance.isConnected"></slot>
</template>
