<script setup lang="ts">
import ServerHeader from '@/components/server/ServerHeader.vue'
import ServerSearch from '@/components/server/ServerSearch.vue'
import ServerSection from '@/components/server/ServerSection.vue'
import ServerChannel from '@/components/server/ServerChannel.vue'
import ServerMember from '@/components/server/ServerMember.vue'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'

import { computed, ref, watch, onMounted } from 'vue'
import { useServerStore } from '@/stores/server'
import { useChannelToggleStore } from '@/stores/cache/channel-toggle'
import { currentProfile } from '@/lib/current-profile'
import type { Server } from '@/service/server'
import type { Channel } from '@/service/channel'
import type { Member } from '@/service/member'
const { getServer, getMembers, getChannels } = useServerStore()
const { getChannelToggle, setChannelToggle } = useChannelToggleStore()

interface ServerSectionProps {
  serverId: string
}
const props = defineProps<ServerSectionProps>()

const profile = await currentProfile()

const server = ref<Server>()
const channels = ref<Array<Channel>>([])
const members = ref<Array<Member>>([])

const profileMember = computed(
  () => members.value?.find((member) => member.profileId === profile?.id)
)
const role = computed(() => profileMember.value?.role)

const textChannels = computed(
  () => channels.value?.filter((channel: Channel) => channel.type === 'TEXT')
)
const audioChannels = computed(() => channels.value?.filter((channel) => channel.type === 'AUDIO'))
const videoChannels = computed(() => channels.value?.filter((channel) => channel.type === 'VIDEO'))
const allMembers = computed(
  () => members.value?.filter((member) => member.profileId !== profileMember?.value?.profileId)
)

const update = async (sId: string) => {
  server.value = await getServer(sId)
  channels.value = await getChannels(sId)
  channels.value = channels.value.sort((a) => (a?.name === 'general' ? -1 : 0))
  members.value = await getMembers(sId)
  const temp = await getChannelToggle(sId)
  if (temp?.length < 3) {
    const data = await Promise.all(
      [true, true, true].map(async (item, key) => {
        return { toggle: item, index: key, serverId: props.serverId }
      })
    )
    await setChannelToggle(data)
  } else {
    sectionOpen.value = await Promise.all(
      temp.sort((a, b) => a.index - b.index).map(async (item) => item.toggle)
    )
  }
}

onMounted(async () => {
  update(props.serverId)
})

watch(
  () => props.serverId,
  async (now) => {
    if (now) update(now)
  }
)

const sectionOpen = ref<Array<boolean>>([true, true, true])
const onToggle = async (value: number) => {
  await setChannelToggle([
    { toggle: !sectionOpen.value[value], index: value, serverId: props.serverId }
  ])
  const temp = await getChannelToggle(props.serverId)
  const data = await Promise.all(
    temp.sort((a, b) => a.index - b.index).map(async (item) => item.toggle)
  )
  sectionOpen.value = data
}
</script>

<template>
  <div class="h-full w-full flex flex-col text-primary dark:bg-[#2b2d31] bg-[#f2f3f5]">
    <ServerHeader :serverId="props.serverId" :role="role" />
    <ScrollArea class="flex-1 px-3">
      <div class="mt-2">
        <ServerSearch
          :data="[
            {
              label: '文字頻道',
              type: 'channel',
              data: textChannels.map((channel) => ({
                id: channel.id ?? '',
                name: channel.name ?? '',
                type: channel.type ?? ''
              }))
            },
            {
              label: '語音頻道',
              type: 'channel',
              data: audioChannels.map((channel) => ({
                id: channel.id ?? '',
                name: channel.name ?? '',
                type: channel.type ?? ''
              }))
            },
            {
              label: '視訊頻道',
              type: 'channel',
              data: videoChannels.map((channel) => ({
                id: channel.id ?? '',
                name: channel.name ?? '',
                type: channel.type ?? ''
              }))
            },
            {
              label: '伺服器成員',
              type: 'member',
              data: allMembers.map((member) => ({
                id: member.id ?? '',
                name: member.name ?? '',
                type: member.role ?? ''
              }))
            }
          ]"
        />
      </div>
      <Separator class="bg-zinc-200 dark:bg-zinc-700 rounded-md my-2" />
      <div v-if="!!textChannels?.length" class="mt-2">
        <ServerSection
          @toggle="onToggle"
          label="文字頻道"
          :role="role"
          sectionType="channels"
          channelType="TEXT"
          :server="server"
          :isSectionOpen="sectionOpen[0]"
        />
        <div className="space-y-[2px]">
          <ServerChannel
            :isSectionOpen="sectionOpen[0]"
            v-for="channel in textChannels"
            :key="channel.id"
            :channel="channel"
            :role="role"
            :server="server"
          />
        </div>
      </div>
      <div v-if="!!audioChannels?.length" class="mt-2">
        <ServerSection
          @toggle="onToggle"
          label="語音頻道"
          :role="role"
          sectionType="channels"
          channelType="AUDIO"
          :server="server"
          :isSectionOpen="sectionOpen[1]"
        />
        <div className="space-y-[2px]">
          <ServerChannel
            :isSectionOpen="sectionOpen[1]"
            v-for="channel in audioChannels"
            :key="channel.id"
            :channel="channel"
            :role="role"
            :server="server"
          />
        </div>
      </div>
      <div v-if="!!videoChannels?.length" class="mt-2">
        <ServerSection
          @toggle="onToggle"
          label="影音頻道"
          :role="role"
          sectionType="channels"
          channelType="VIDEO"
          :server="server"
          :isSectionOpen="sectionOpen[2]"
        />
        <div className="space-y-[2px]">
          <ServerChannel
            :isSectionOpen="sectionOpen[2]"
            v-for="channel in videoChannels"
            :key="channel.id"
            :channel="channel"
            :role="role"
            :server="server"
          />
        </div>
      </div>
      <div v-if="!!members?.length" class="mt-2">
        <ServerSection label="伺服器成員" :role="role" sectionType="members" :server="server" />
        <div className="space-y-[2px]">
          <ServerMember
            v-for="member in members"
            :key="member.id"
            :member="member"
            :server="server"
          />
        </div>
      </div>
    </ScrollArea>
  </div>
</template>
