import { ref } from 'vue'
import { defineStore } from 'pinia'
import * as ClientIO from 'socket.io-client'

type SocketContextType = {
  socket: any | null
  isConnected: boolean
}

export const useSocket = defineStore('socket', () => {
  const socketInstance = ref<SocketContextType>({
    socket: null,
    isConnected: false
  })
  const lastConnectedTime = ref<Date>(new Date())

  const onOpenSocketIO = () => {
    socketInstance.value.socket = new (ClientIO as any)(import.meta.env.VITE_HOST)
    // socketInstance.value.socket = new (ClientIO as any)(import.meta.env.VITE_HOST, {
    //   path: '/socket.io',
    //   addTrailingSlash: false,
    // });

    socketInstance.value.socket.on('connect', () => {
      lastConnectedTime.value = new Date()
      socketInstance.value.isConnected = true
      console.log('I am connected')
    })

    socketInstance.value.socket.on('disconnect', () => {
      const disconnectTime = new Date()
      setTimeout(() => {
        if ((lastConnectedTime.value.getTime() - disconnectTime.getTime()) / 1000 / 60 / 60 < 0) {
          socketInstance.value.isConnected = false
        }
      }, 3000)
    })
  }

  const onCloseSocketIO = () => {
    socketInstance.value.socket.disconnect()
  }

  return { socketInstance, onOpenSocketIO, onCloseSocketIO }
})
