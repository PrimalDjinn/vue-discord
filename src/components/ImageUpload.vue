<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ref } from 'vue'

// 圖片預覽 和 狀態轉移
const image = ref<{
  preview: string
  file?: FileList | null
  isAdded: boolean
  isUploaded: boolean
  isLoading: boolean
}>({
  preview: '',
  file: null,
  isAdded: false,
  isUploaded: false,
  isLoading: false
})

const handleChange = (event: Event) => {
  const file = (event.target as HTMLInputElement)?.files

  if (!file || file?.length === 0) {
    image.value.preview = ''
    image.value.file = null
    image.value.isAdded = false
    return
  }

  const reader = new FileReader()
  reader.onload = (e) => {
    if (!e.target?.result) return
    image.value.preview = e.target?.result as string
    image.value.isAdded = true
    image.value.file = file
  }

  reader.readAsDataURL(file[0])
}

const emit = defineEmits<{
  upload: [value: string]
}>()

// TODO 上傳
const handleUpload = () => {
  // 上傳至 Digital Ocean

  const file = 'https://assets.leetcode.com/users/avatars/avatar_1693288285.png'
  if (file.length > 0) {
    image.value.isUploaded = true
  } else {
    image.value.isUploaded = false
  }
  emit('upload', file)
}

// TODO Delete
const handleDelete = () => {
  // 刪除在線檔案

  image.value.preview = ''
  image.value.file = null
  image.value.isAdded = false
  image.value.isUploaded = false
  emit('upload', '')
}
</script>
<template>
  <div class="space-y-2 flex flex-col items-center justify-center text-center">
    <div
      v-show="!image.isAdded"
      class="max-w-sm p-6 mb-2 bg-gray-100 border-dashed border-2 border-gray-400 rounded-lg items-center mx-auto text-center cursor-pointer dark:bg-zinc-300/10"
    >
      <input
        @change="handleChange"
        id="imageUrlFile"
        type="file"
        class="hidden"
        accept="image/*"
        :disabled="image.isUploaded"
      />
      <label for="imageUrlFile" class="cursor-pointer">
        <svg
          class="w-8 h-8 mx-auto mb-2"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1280.000000 984.000000"
          preserveAspectRatio="xMidYMid meet"
        >
          <g
            class="fill-gray-700 dark:fill-gray-400"
            transform="translate(0.000000,984.000000) scale(0.100000,-0.100000)"
            fill="#000000"
            stroke="none"
          >
            <path
              d="M4790 9830 c-238 -42 -424 -193 -600 -490 -37 -63 -220 -420 -406 -792 l-339 -677 -1085 -3 c-1079 -3 -1085 -3 -1183 -25 -306 -70 -526 -190 -743 -407 -216 -216 -339 -443 -406 -749 l-23 -102 0 -2640 c0 -2505 1 -2645 18 -2735 60 -313 218 -600 449 -815 205 -190 463 -319 743 -371 97 -18 260 -19 5185 -19 4925 0 5088 1 5185 19 303 56 562 193 780 411 216 216 354 477 412 777 17 88 18 235 18 2733 l0 2640 -23 102 c-67 305 -191 533 -406 749 -217 217 -437 337 -743 407 -98 22 -104 22 -1183 25 l-1085 3 -339 677 c-186 372 -363 720 -394 772 -160 275 -312 418 -519 488 l-78 27 -1595 1 c-877 1 -1615 -2 -1640 -6z m-3224 -2951 c87 -16 176 -63 248 -129 203 -190 207 -500 10 -698 -111 -111 -269 -165 -416 -142 -244 37 -419 239 -419 483 -1 95 11 148 51 227 56 110 156 197 275 238 95 34 155 39 251 21z m5199 -14 c865 -110 1617 -579 2101 -1307 321 -482 484 -1030 484 -1623 0 -362 -55 -678 -176 -1013 -278 -767 -895 -1408 -1653 -1717 -369 -150 -714 -217 -1121 -217 -553 0 -1044 134 -1518 416 -268 159 -558 409 -765 659 -355 427 -585 971 -652 1543 -20 168 -19 491 0 659 79 677 374 1286 855 1765 506 504 1169 802 1900 854 106 7 426 -4 545 -19z"
            />
            <path
              d="M6230 5404 c-158 -19 -348 -78 -495 -151 -535 -269 -859 -847 -806 -1436 61 -675 536 -1200 1206 -1333 125 -25 405 -25 530 0 467 93 847 378 1055 793 121 243 174 517 150 778 -59 656 -507 1170 -1150 1321 -85 21 -138 26 -280 29 -96 2 -191 1 -210 -1z"
            />
          </g>
        </svg>
        <h5 class="mb-2 text-xl font-bold tracking-tight text-gray-700 dark:text-foreground">
          圖片上傳
        </h5>
        <p class="font-normal text-sm text-gray-400 md:px-6">
          請選擇圖片小於 <b class="text-gray-600 dark:text-foreground">2mb</b>
        </p>
        <p class="font-normal text-sm text-gray-400 md:px-6">
          並且僅支援 <b class="text-gray-600 dark:text-foreground">JPG, PNG 或 GIF</b> 格式。
        </p>
      </label>
    </div>
    <div v-show="image.isAdded" class="relative">
      <label for="imageUrlFile" class="cursor-pointer" :disabled="image.isUploaded">
        <Avatar class="w-24 h-24">
          <AvatarImage :src="image.preview" alt="@radix-vue" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </label>
      <button
        @click="handleDelete"
        v-if="image.isUploaded"
        type="button"
        aria-label="Close"
        class="absolute bg-primary top-0 right-0 p-0.5 transition-colors rounded-full hover:bg-primary/90 text-primary-foreground"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="w-5 h-5"
        >
          <path d="M18 6 6 18"></path>
          <path d="m6 6 12 12"></path></svg
        ><span class="sr-only">Close</span>
      </button>
      <div v-if="!image.isUploaded" class="flex items-center justify-center">
        <Button @click="handleUpload" variant="default" :disabled="image.isLoading" type="button">
          上傳
        </Button>
      </div>
    </div>
  </div>
</template>
