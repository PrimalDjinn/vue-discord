<script setup lang="ts">
import { UserButton } from 'vue-clerk'
import InitialModal from '@/components/modals/InitialModal.vue'
import { initialProfile } from '@/lib/initial-profile'
import { onMounted } from 'vue'
import { getFirst } from '@/service/server'
import { useRouter } from 'vue-router'
const AfterSignOutUrl = import.meta.env.VITE_PUBLIC_AFTER_SIGN_IN_URL

onMounted(async () => {
  // const profile = await initialProfile()
  // try {
  //   const res = await getFirst({ profileId: profile?.id })
  //   console.log(res)
  //   if (res?.data) {
  //     const server = res?.data
  //     const router = useRouter()
  //     router.push(`/server/${server?.id}`)
  //   }
  // } catch (error) {
  //   console.error(error)
  // }
})
</script>

<template>
  <main>
    <UserButton :afterSignOutUrl="AfterSignOutUrl" />
    <InitialModal />
  </main>
</template>
