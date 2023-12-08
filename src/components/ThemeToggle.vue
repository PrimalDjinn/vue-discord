<script setup lang="ts">
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Moon, Sun } from 'lucide-vue-next'
import { useThemeStore } from '@/stores/theme'
import { Button } from '@/components/ui/button'
import { storeToRefs } from 'pinia'

const { toggleMode, changeTheme } = useThemeStore()
const { mode, theme } = storeToRefs(useThemeStore())

// class 對應 顏色
interface colorMap {
  [key: string]: string
}
const color: colorMap = {
  'theme-default': 'bg-default',
  'theme-zinc': 'bg-zinc',
  'theme-green': 'bg-green',
  'theme-red': 'bg-red',
  'theme-blue': 'bg-blue',
  'theme-yellow': 'bg-yellow',
  'theme-orange': 'bg-orange',
  'theme-violet': 'bg-violet'
}

// mode list
interface modeListType {
  icon: string
  name: string
}
interface modeListTypeItems extends Array<modeListType> {}
const modeList: modeListTypeItems = [
  { icon: 'Sun', name: 'Light' },
  { icon: 'Moon', name: 'Dark' }
]

// theme list
interface themeListTypeItems extends Array<string> {}
const themeList: themeListTypeItems = [
  'Default',
  'Zinc',
  'Green',
  'Red',
  'Blue',
  'Violet',
  'Yellow',
  'Orange'
]
</script>

<template>
  <Popover>
    <PopoverTrigger>
      <Button variant="outline" class="bg-transparent border-1">
        <div>
          <Moon class="stroke-black dark:stroke-white" v-show="mode === 'dark'" />
          <Sun class="stroke-black dark:stroke-white" v-show="mode === 'light'" />
        </div>
        <!-- <span
          class="h-4 w-4 rounded-full flex items-center justify-center ml-2"
          :class="color[theme]"
        ></span> -->
      </Button>
    </PopoverTrigger>

    <PopoverContent class="w-100">
      <div>
        <p>顏色</p>
        <div class="grid grid-cols-3 gap-2 py-1.5">
          <Button
            v-for="_mode in modeList"
            :key="_mode.name"
            :class="mode === _mode.name.toLocaleLowerCase() ? 'border-2 border-foreground' : ''"
            class="h-8"
            variant="outline"
            @click="toggleMode(_mode.name.toLocaleLowerCase())"
          >
            <Moon class="w-4 h-4" v-if="_mode.icon === 'Moon'" />
            <Sun class="w-4 h-4" v-else />
            <span class="ml-2 text-xs">{{ _mode.name }}</span>
          </Button>
        </div>

        <p>主題</p>
        <div class="grid grid-cols-3 gap-2 py-1.5">
          <Button
            v-for="_theme in themeList"
            :key="_theme"
            :class="
              theme === 'theme-' + _theme.toLocaleLowerCase() ? 'border-2 border-foreground' : ''
            "
            @click="changeTheme('theme-' + _theme.toLocaleLowerCase())"
            variant="outline"
            class="h-8 justify-start"
          >
            <span
              class="h-4 w-4 rounded-full flex items-center justify-center"
              :class="'bg-' + _theme.toLocaleLowerCase()"
            ></span>
            <span class="ml-2 text-xs">{{ _theme }}</span>
          </Button>
        </div>
      </div>
    </PopoverContent>
  </Popover>
</template>

<style scoped>
.bg-default {
  background-color: rgb(99, 102, 241);
}
.bg-zinc {
  background-color: rgb(28, 25, 23);
}
.bg-green {
  background-color: rgb(0, 128, 0);
}
.bg-orange {
  background-color: rgb(233, 89, 12);
}
.bg-red {
  background-color: rgb(206, 28, 67);
}
.bg-blue {
  background-color: rgb(52, 118, 223);
}
.bg-yellow {
  background-color: rgb(250, 204, 20);
}
.bg-violet {
  background-color: rgb(109, 40, 217);
}
</style>
