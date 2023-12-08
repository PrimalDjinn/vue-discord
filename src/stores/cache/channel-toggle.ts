import { defineStore } from 'pinia'
import { openDB, type DBSchema } from 'idb'

type ChannelToggle = {
  id?: string
  toggle: boolean
  index: number
  serverId: string
}

export const useChannelToggleStore = defineStore('channelToggle', () => {
  const getChannelToggle = async (serverId: string): Promise<Array<ChannelToggle>> => {
    return await serverDB.getAllFromIndex('channelToggle', 'by-serverId', serverId)
  }

  const setChannelToggle = async (data: Array<ChannelToggle>): Promise<void> => {
    const tx = serverDB.transaction('channelToggle', 'readwrite')
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

// IndexedDB 緩存資料庫
interface channelToggleDB extends DBSchema {
  channelToggle: {
    key: string
    indexes: { 'by-serverId': string }
    value: {
      id: string
      toggle: boolean
      index: number
      serverId: string
    }
  }
}

export const serverDB = await openDB<channelToggleDB>('ServerData', 1, {
  upgrade(db) {
    const channelToggleStore = db.createObjectStore('channelToggle', {
      keyPath: 'id',
      autoIncrement: false
    })
    channelToggleStore.createIndex('by-serverId', 'serverId')
  }
})
