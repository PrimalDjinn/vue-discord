import { defineStore } from 'pinia'
import { clientDB } from '@/stores/indexedDB'

type ChannelToggle = {
  id?: string
  toggle: boolean
  index: number
  serverId: string
}

export const useChannelToggleStore = defineStore('channelToggle', () => {
  const getChannelToggle = async (serverId: string): Promise<Array<ChannelToggle>> => {
    return await clientDB.getAllFromIndex('channelToggle', 'by-serverId', serverId)
  }

  const setChannelToggle = async (data: Array<ChannelToggle>): Promise<void> => {
    const tx = clientDB.transaction('channelToggle', 'readwrite')
    const asyncList = (data: Array<ChannelToggle>) =>
      data.map((item) => {
        tx.store.put({
          id: item.serverId + item.index,
          toggle: item.toggle,
          index: item.index,
          serverId: item.serverId
        })
      })
    await Promise.all([...asyncList(data), tx.done])
  }

  return {
    getChannelToggle,
    setChannelToggle
  }
})
