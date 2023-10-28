import { ref, watch } from 'vue'
import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', () => {
    // 當前的模式：dark, light
    const mode = ref('light')

    // 切換亮暗模式
    const toggleMode = (_mode: undefined | string): void => {
        if(_mode !== undefined) {
            mode.value = _mode
        } else {
            if(mode.value === 'light') mode.value = 'dark'
            else mode.value = 'light'
        }
    }

    // 監聽值的變化，然後更新 class
    watch(mode, (newVal, oldVal) => {
        const body = document.querySelector('body')
        body?.classList.remove(oldVal)
        body?.classList.add(newVal)
    })


    // 當前的主題顏色
    const theme = ref('theme-default')

    // 切換主題顏色
    const changeTheme = (_theme: string): void => {
        if(theme.value === _theme) return
        theme.value = _theme
    }

    // 監聽值的變化，然後更新 class
    watch(theme, (newVal) => {
        const root = document.querySelector(':root')
        if(root !== null) root.className = ''
        if(mode.value === 'dark') root?.classList.add(mode.value)
        root?.classList.add(newVal)
    })

    return { mode, theme, toggleMode, changeTheme }
}, { persist: true })