<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useSocket } from '@/stores/socket'
import { Badge } from '@/components/ui/badge'
const { socketInstance } = storeToRefs(useSocket())
</script>

<template>
  <Badge
    v-if="!socketInstance.isConnected"
    variant="outline"
    class="bg-yellow-600 text-white border-none"
  >
    離線: 重新連線中...
  </Badge>
  <Badge v-else variant="outline" class="bg-emerald-600 text-white border-none">
    在線: 即時更新
  </Badge>
</template>
