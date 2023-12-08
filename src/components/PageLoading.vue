<script setup lang="ts">
import { Loader2Icon } from 'lucide-vue-next'
interface PageLoadingProps {
  isLoading: boolean
}
const props = withDefaults(defineProps<PageLoadingProps>(), {
  isLoading: false
})
</script>
<template>
  <div class="w-full h-full z-50 flex justify-center items-center" v-if="props.isLoading">
    <Loader2Icon class="h-10 w-10 animate-spin stroke-primary" />
  </div>
</template>
