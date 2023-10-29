<script setup lang="ts">
// import TheWelcome from '../components/TheWelcome.vue'

import { Button } from '@/components/ui/button'
import { UserButton } from 'vue-clerk'
import { initialProfile } from '../../lib/initial-profile'
import { onMounted } from 'vue'
import type { Profile } from '@/service/profile'
import { getFirst, type Server } from '@/service/server'
import type { ApiResult } from '@/service/api'
import { useRouter } from 'vue-router'
const AfterSignOutUrl = import.meta.env.VITE_PUBLIC_AFTER_SIGN_IN_URL

onMounted(async () => {
  const profile: Profile | undefined = await initialProfile()

  try {
    const res: ApiResult<Server> | undefined = await getFirst({ profileId: Number(profile?.id) })
    console.log(res)
    if (res?.data) {
      const router = useRouter()
      router.push(import.meta.env.VITE_PUBLIC_SIGN_IN_URL)
    }
  } catch (error) {
    console.error(error)
  }
})
</script>

<template>
  <main>
    <UserButton :afterSignOutUrl="AfterSignOutUrl" />
    <Button>Click me</Button>
  </main>
</template>
