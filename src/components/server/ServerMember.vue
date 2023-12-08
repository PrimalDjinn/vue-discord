<script setup lang="ts">
import { type Server } from '@/service/server'
import type { Member } from '@/service/member'
import { ShieldCheck, ShieldAlert } from 'lucide-vue-next'
import { cn } from '@/lib/utils'
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import UserAvatar from '@/components/UserAvatar.vue'

interface ServerMemberProps {
  member?: Member
  server?: Server
}

const props = defineProps<ServerMemberProps>()

const route = useRoute()
const router = useRouter()
const params = computed(() => route.params)

const onClick = () => {
  router.push(`/server/${params?.value.serverId}/conversation/${props?.member?.id}`)
}
</script>
<template>
  <button
    @click="onClick"
    :class="
      cn(
        'group px-2 py-2 rounded-md flex items-center gap-x-2 w-full hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition mb-1',
        params?.memberId === props?.member?.id && 'bg-zinc-700/20 dark:bg-zinc-700'
      )
    "
  >
    <UserAvatar :src="props?.member?.imageUrl" class="h-8 w-8 md:h-8 md:w-8" />
    <p
      :class="
        cn(
          'font-semibold text-sm text-zinc-500 group-hover:text-zinc-600 dark:text-zinc-400 dark:group-hover:text-zinc-300 transition',
          params?.memberId === props?.member?.id &&
            'text-zinc-600 dark:text-zinc-200 dark:group-hover:text-white'
        )
      "
    >
      {{ props?.member?.name }}
    </p>
    <ShieldAlert
      v-if="props?.member?.role === 'MODERATOR'"
      class="mr-2 h-5 w-5 flex-shrink-0 text-primary"
    />
    <ShieldCheck
      v-if="props?.member?.role === 'ADMIN'"
      class="mr-2 h-5 w-5 flex-shrink-0 text-rose-500"
    />
  </button>
</template>
