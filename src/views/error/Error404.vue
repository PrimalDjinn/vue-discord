<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
</script>
<template>
  <div class="w-full h-full flex items-center justify-center">
    <code class="text-center">
      <div class="flex space-x-4 items-center h-10">
        <span class="font-semibold text-xl md:text-3xl">404 </span>
        <Separator
          orientation="vertical"
          class="w-[4px] h-full bg-zinc-200 dark:bg-zinc-700 rounded-md my-2"
        />
        <span class="text-sm md:text-lg"> This page could not be found.</span>
      </div>
      <br />
      <router-link to="/" class="text-center">
        <Button variant="default"> 回首頁 </Button>
      </router-link>
    </code>
  </div>
</template>
