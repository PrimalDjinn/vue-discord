<script setup lang="ts">
import InitialModal from '@/components/modals/InitialModal.vue'
import PageLoading from '@/components/PageLoading.vue'
import { initialProfile } from '@/lib/initial-profile'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useServerStore } from '@/stores/server'
const { handleServers, getServers, resetServers } = useServerStore()

const router = useRouter()
const openModal = ref<boolean>(false)

onMounted(async () => {
  // 登入後端
  const profile = await initialProfile()
  try {
    
    openModal.value = true
  } catch (error) {
    const servers = await getServers()
    // 就算網路有問題，還是可以用緩存資料直接操作
    if (!window.navigator.onLine) if (servers.length > 0) router.push(`/server/${servers[0].id}`)
    console.error(error)
  }
})
</script>

<template>
  <main class="w-full h-full">
    <PageLoading :isLoading="!openModal" />
    <InitialModal :open="openModal" />
  </main>
</template>
