<script setup lang="ts">
// import TheWelcome from '../components/TheWelcome.vue'

import { Button } from '@/components/ui/button'
import { UserButton } from 'vue-clerk'
const AfterSignOutUrl = import.meta.env.VITE_PUBLIC_AFTER_SIGN_IN_URL
</script>

<template>
  <main>
    <UserButton :afterSignOutUrl="AfterSignOutUrl" />
    <Button>Click me</Button>
  </main>
</template>
