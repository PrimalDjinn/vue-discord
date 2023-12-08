import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Server, ServerDetail } from '@/service/server'
import { type Channel } from '@/service/channel'
import type { Member } from '@/service/member'

export type ModalType =
  | 'createServer'
  | 'invite'
  | 'editServer'
  | 'members'
  | 'createChannel'
  | 'editChannel'
  | 'messageFile'

interface ModalData {
  server?: Server | null
  channelType?: string
  channel?: Channel
  members?: Array<Member>
}

// interface ModalStore {
//   type: ModalType | null;
//   data: ModalData;
//   isOpen: boolean;
//   onOpen: (type: ModalType, data?: ModalData) => void;
//   onClose: () => void
// }

export const useModal = defineStore('modal', () => {
  const type = ref<ModalType | null>(null)
  const data = ref<ModalData>({})
  const isOpen = ref<boolean>(false)

  const onOpen = (_type: ModalType, _data: ModalData = {}): void => {
    isOpen.value = true
    data.value = _data
    type.value = _type
  }
  const onClose = (): void => {
    isOpen.value = false
    type.value = null
  }

  return { type, data, isOpen, onOpen, onClose }
})
