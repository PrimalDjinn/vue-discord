import { defineStore } from 'pinia'
import { nextTick, ref } from 'vue'

export const useReloadStore = defineStore('reload', () => {
  // 重新刷新組件
  const isAllComponentAlive = ref<boolean>(true)
  const reloadAll = () => {
    isAllComponentAlive.value = false
    nextTick(() => {
      isAllComponentAlive.value = true
    })
  }

  const isNavAlive = ref<boolean>(true)
  const reloadNav = () => {
    isNavAlive.value = false
    nextTick(() => {
      isNavAlive.value = true
    })
  }

  const isSidebarAlive = ref<boolean>(true)
  const reloadSidebar = () => {
    isSidebarAlive.value = false
    nextTick(() => {
      isSidebarAlive.value = true
    })
  }

  return { isAllComponentAlive, reloadAll, isNavAlive, reloadNav, isSidebarAlive, reloadSidebar }
})
