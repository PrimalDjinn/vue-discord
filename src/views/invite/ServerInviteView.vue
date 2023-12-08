<script setup lang="ts">
import { currentProfile } from '@/lib/current-profile'
import { onMounted, computed, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuth } from 'vue-clerk'
import { useMiddleware } from '@/composables/middlewares'
import * as member from '@/service/member'
import PageLoading from '@/components/PageLoading.vue'

// 守護路由
const { isSignedIn } = useAuth()
useMiddleware(isSignedIn.value, false)

// TODO 無效邀請
// TODO 是否加入

const router = useRouter()
const route = useRoute()
const inviteCode = computed(() => route.params?.inviteCode)
const msg = ref<string | undefined>('')
const isLoading = ref<boolean>(true)
onMounted(async () => {
  if (!inviteCode.value) router.push('/')
  await currentProfile()

  try {
    const res = await member.invite({ inviteCode: inviteCode.value as string })
    if (!res?.data) {
      let splitMsg: Array<string> = ['']
      if (res?.msg) splitMsg = res?.msg.split('=')
      msg.value = splitMsg[splitMsg.length - 1]
      return
    }
    router.push(`/server/${res?.data?.id}`)
  } catch (error) {
    console.error(error)
    msg.value = 'something went wrong.'
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <PageLoading :isLoading="isLoading" />
  <main class="w-full h-full flex justify-center items-center">
    <p>{{ msg }}</p>
  </main>
</template>
