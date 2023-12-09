import { openDB, type DBSchema } from 'idb'

// IndexedDB 緩存資料庫
interface ClientDB extends DBSchema {
  // 伺服器
  servers: {
    key: string
    indexes: { 'by-profileId': string }
    value: {
      id: string
      profileId: string
      name: string
      imageUrl: string
      inviteCode: string
    }
  }
  // 伺服器成員
  members: {
    key: string
    indexes: { 'by-serverId': string }
    value: {
      id: string
      profileId: string
      name: string
      imageUrl: string
      email: string
      role: string
      serverId: string
    }
  }
  // 伺服器頻道
  channels: {
    key: string
    indexes: { 'by-serverId': string }
    value: {
      id: string
      name: string
      type: string
      serverId: string
    }
  }
  // 紀錄 channel 是否要展開
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

export const clientDB = await openDB<ClientDB>('ClientDB', 1, {
  upgrade(db) {
    const serversStore = db.createObjectStore('servers', { keyPath: 'id', autoIncrement: false })
    const membersStore = db.createObjectStore('members', { keyPath: 'id', autoIncrement: false })
    const channelsStore = db.createObjectStore('channels', { keyPath: 'id', autoIncrement: false })
    const channelToggleStore = db.createObjectStore('channelToggle', {
      keyPath: 'id',
      autoIncrement: false
    })
    serversStore.createIndex('by-profileId', 'profileId')
    membersStore.createIndex('by-serverId', 'serverId')
    channelsStore.createIndex('by-serverId', 'serverId')
    channelToggleStore.createIndex('by-serverId', 'serverId')
  }
})
