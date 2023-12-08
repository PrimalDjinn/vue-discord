<script setup lang="ts">
import { Button } from '@/components/ui/button'
import UserAvatar from './UserAvatar.vue'
import { ref, onMounted } from 'vue'
import { X, Image } from 'lucide-vue-next'
import { AlertDialogTrigger } from '@/components/ui/alert-dialog'
import Alert from '@/components/Alert.vue'

import { cn } from '@/lib/utils'
interface ImageUploadProps {
  file?: string
}
const props = withDefaults(defineProps<ImageUploadProps>(), { file: '' })

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

onMounted(() => {
  if (props.file !== '') {
    image.value.preview = props.file
    image.value.isAdded = true
    image.value.isUploaded = true
  }
})

const isDragging = ref<boolean>(false)
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
    <Alert title="刪除圖片" descrption="您確定要刪除圖片?" @action="handleDelete">
      <div
        v-show="!image.isAdded"
        :class="
          cn(
            'relative max-w-sm mb-2 bg-gray-100 border-dashed border-2 border-gray-400 rounded-lg items-center mx-auto text-center cursor-pointer dark:bg-zinc-300/10 ',
            isDragging && 'border-gray-200 bg-gray-200 dark:bg-zinc-300/20'
          )
        "
      >
        <input
          @change="handleChange"
          id="imageUrlFile"
          type="file"
          class="opacity-0 w-full h-full absolute left-0 cursor-pointer"
          accept="image/*"
          :disabled="image.isUploaded"
          @drag.prevent="isDragging = false"
          @dragenter="isDragging = true"
          @dragleave="isDragging = false"
        />
        <label for="imageUrlFile" class="cursor-pointer">
          <div class="pt-6">
            <Image class="w-8 h-8 mx-auto mb-2" />
          </div>

          <h5 class="mb-2 text-xl font-bold tracking-tight text-gray-700 dark:text-foreground">
            拖拉或點擊上傳
          </h5>
          <p class="font-normal text-sm text-gray-400 md:px-6">
            請選擇圖片小於 <b class="text-gray-600 dark:text-foreground">2mb</b>
          </p>
          <p class="font-normal text-sm text-gray-400 md:px-6 pb-6">
            並且僅支援 <b class="text-gray-600 dark:text-foreground">JPG, PNG 或 GIF</b> 格式。
          </p>
        </label>
      </div>
      <div v-show="image.isAdded" class="relative">
        <label
          for="imageUrlFile"
          class="cursor-pointer overflow-auto relative inline-block"
          :disabled="image.isUploaded"
        >
          <AlertDialogTrigger v-if="image.isAdded" as-child>
            <button
              type="button"
              aria-label="Close"
              class="absolute bg-primary top-0 right-0 p-0.5 transition-colors rounded-full hover:bg-primary/90 text-primary-foreground"
            >
              <X class="w-5 h-5 mx-auto" />
            </button>
          </AlertDialogTrigger>
          <UserAvatar :src="image.preview" class="w-24 h-24 md:w-24 md:h-24" />
        </label>
        <div v-if="!image.isUploaded" class="flex flex-col items-center justify-center">
          <Button @click="handleUpload" variant="default" :disabled="image.isLoading" type="button">
            上傳
          </Button>
          <p class="font-normal text-sm text-gray-400 md:px-6 py-3">
            請點擊上傳按鈕，將圖片上傳至伺服器。
          </p>
        </div>
      </div>
    </Alert>
  </div>
</template>
