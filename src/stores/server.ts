import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Server, ServerDetail } from '@/service/server'
import type { Member } from '@/service/member'
import type { Channel } from '@/service/channel'
import { clientDB } from '@/stores/indexedDB'

export const useServerStore = defineStore(
  'server',
  () => {
    const servers = ref<Array<Server>>([])
    const server = ref<Server>()
    const members = ref<Array<Member>>([])
    const channels = ref<Array<Channel>>([])

    const getServers = async (): Promise<Array<Server>> => {
      if (servers.value.length > 0) return servers.value
      const temp = await clientDB.getAll('servers')
      servers.value = temp
      return temp
    }

    // const resetChannels = async (): Promise<void> => {
    //   channels.value = []
    //   await clientDB.clear('channels')
    // }

    const resetServers = async (): Promise<void> => {
      servers.value = []
      await clientDB.clear('servers')
    }

    const handleServers = async (_servers: Array<Server>): Promise<void> => {
      // 存入 cache
      const tx = clientDB.transaction('servers', 'readwrite')
      const asyncList = (data: Array<Server>) =>
        data.map((item) => {
          if (!item.id || !item.profileId || !item.name || !item.imageUrl || !item.inviteCode)
            return
          return tx.store.add({
            id: item.id,
            profileId: item.profileId,
            name: item.name,
            imageUrl: item.imageUrl,
            inviteCode: item.inviteCode
          })
        })
      // 最後一步 call done method 來結束這次的transaction
      await Promise.all([...asyncList(_servers), tx.done])

      // 存入記憶體
      servers.value = _servers
    }

    const getServer = async (serverId: string): Promise<Server | undefined> => {
      if (server.value?.id == serverId) return server.value
      // Setup 會先撈資料，如果 cache 有資料代表不用重新撈
      const temp = await clientDB.get('servers', serverId)
      server.value = temp
      return temp
    }

    const resetServer = async (serverId: string): Promise<void> => {
      server.value = {}

      // 刪除 members
      const memberKeys = await clientDB.getAllKeysFromIndex('members', 'by-serverId', serverId)
      if (memberKeys.length)
        memberKeys.forEach((item) => {
          clientDB.delete('members', item)
        })

      // 刪除 channels
      const channelKeys = await clientDB.getAllKeysFromIndex('channels', 'by-serverId', serverId)
      if (channelKeys.length)
        channelKeys.forEach((item) => {
          clientDB.delete('channels', item)
        })
    }

    const handleServer = async (_server: ServerDetail): Promise<void> => {
      // 存入 cache
      const tx = clientDB.transaction('members', 'readwrite')
      // 加入新值
      const asyncList = (data: Array<Member>) =>
        data.map((item) => {
          if (
            !item.id ||
            !item.profileId ||
            !item.name ||
            !item.imageUrl ||
            !item.email ||
            !item.role
          )
            return
          tx.store.add({
            id: item.id,
            profileId: item.profileId,
            name: item.name,
            imageUrl: item.imageUrl,
            email: item.email,
            role: item.role,
            serverId: _server.id ?? ''
          })
        })
      await Promise.all([...asyncList(_server.members ?? []), tx.done])
      members.value = _server.members ?? []

      const tx2 = clientDB.transaction('channels', 'readwrite')
      // 加入新值
      const asyncList2 = (data: Array<Channel>) =>
        data.map((item) => {
          if (!item.id || !item.type || !item.name || !item.serverId) return
          tx2.store.add({
            id: item.id,
            name: item.name,
            type: item.type,
            serverId: item.serverId
          })
        })
      await Promise.all([...asyncList2(_server.channels ?? []), tx2.done])
      channels.value = _server.channels ?? []

      server.value = _server
    }

    const getMembers = async (serverId: string): Promise<Array<Member>> => {
      if (members.value.length > 0) if (members.value[0].serverId === serverId) return members.value

      const temp = await clientDB.getAllFromIndex('members', 'by-serverId', serverId)
      members.value = temp
      return temp
    }

    const getChannels = async (serverId: string): Promise<Array<Channel>> => {
      if (channels.value.length > 0)
        if (channels.value[0].serverId === serverId) return channels.value

      const temp = await clientDB.getAllFromIndex('channels', 'by-serverId', serverId)
      channels.value = temp
      return temp
    }

    const handleChannels = async (_channels: Array<Channel>): Promise<void> => {
      const tx = clientDB.transaction('channels', 'readwrite')
      // 加入新值
      const asyncList = (data: Array<Channel>) =>
        data.map((item) => {
          if (!item.id || !item.type || !item.name || !item.serverId) return
          tx.store.put({
            id: item.id,
            name: item.name,
            type: item.type,
            serverId: item.serverId
          })
        })
      await Promise.all([...asyncList(_channels ?? []), tx.done])
      channels.value = _channels ?? []
    }

    const resetChannels = async (serverId: string): Promise<void> => {
      const tx = clientDB.transaction('channels', 'readwrite')
      const index = tx.store.index('by-serverId')
      const ch = index.openCursor(serverId)
      ch.then(async (cursor) => {
        while (cursor) {
          cursor.delete()
          cursor = await cursor.continue()
        }
      })
      channels.value = []
    }

    const clearServerCache = (): void => {
      servers.value = []
      server.value = {}
      members.value = []
      channels.value = []
    }

    return {
      clearServerCache,
      handleServers,
      handleChannels,
      resetChannels,
      getServers,
      resetServers,
      handleServer,
      getServer,
      resetServer,
      getMembers,
      getChannels
    }
  },
  { persist: true }
)
