<script setup lang="ts">
import { useRoute } from 'vue-router'
import { onMounted, computed, watch, ref, inject, nextTick, provide } from 'vue'
import { currentProfile } from '@/lib/current-profile'
import ServerSideBar from '@/components/server/ServerSidebar.vue'
import PageLoading from '@/components/PageLoading.vue'
import * as servers from '@/service/server'
import { useRouter } from 'vue-router'
import ModalProvider from '@/components/providers/ModalProvider.vue'
import { useServerStore } from '@/stores/server'
import { useReloadStore } from '@/stores/reload'
import { storeToRefs } from 'pinia'
const { handleServer, resetServer, getServer, getMembers, getChannels } = useServerStore()

const route = useRoute()
const router = useRouter()
const serverId = computed(() => route.params?.serverId as string)

const isLoading = ref<boolean>(false)

const profile = await currentProfile()
const getServerDetail = async () => {
  try {
    const sId = serverId.value as string
    // 如果 cache 有資料代表不用重新撈
    const serverCache = await getServer(sId)
    // 只要有 cache 且 members 和 channels 不為 []
    if (serverCache && (await getMembers(sId)).length > 0 && (await getChannels(sId)).length > 0)
      return

    isLoading.value = true
    const res = await servers.findOne({
      profileId: profile?.id,
      id: sId
    })
    if (!res?.data) router.push('/')
    res.data.channels = res.data?.channels ?? []
    res.data.members = res.data?.members ?? []
    await resetServer(sId)
    await handleServer(res?.data)
  } catch (error) {
    console.error(error)
  } finally {
    setTimeout(() => {
      isLoading.value = false
    }, 300)
  }
}

onMounted(async () => {
  getServerDetail()
})

watch(serverId, async () => {
  getServerDetail()
})

const { isSidebarAlive } = storeToRefs(useReloadStore())
</script>

<template>
  <ModalProvider />
  <PageLoading :isLoading="isLoading" />
  <div class="h-full" v-show="!isLoading">
    <div class="hidden md:flex w-60 z-20 flex-col fixed inset-y-0">
      <ServerSideBar v-if="isSidebarAlive" :serverId="serverId" />
    </div>
    <main class="h-full md:pl-60 dark:bg-[#313338]">
      <RouterView v-slot="{ Component }">
        <component :is="Component" />
      </RouterView>
    </main>
  </div>
</template>
