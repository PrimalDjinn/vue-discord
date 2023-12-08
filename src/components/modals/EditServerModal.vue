<script setup lang="ts">
import ImageUpload from '@/components/ImageUpload.vue'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import * as server from '@/service/server'
import { useForm } from 'vee-validate'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '../ui/input'
import { Button } from '@/components/ui/button'
import { useModal } from '@/stores/modal'
import { useServerStore, serverDB } from '@/stores/server'
import { computed, inject, watch } from 'vue'
import { storeToRefs } from 'pinia'

const { isOpen, type, data } = storeToRefs(useModal())
const { onClose } = useModal()

const { clearServerCache } = useServerStore()

const refresh: any = inject('reloadNav')

const isModalOpen = computed(() => isOpen.value && type.value === 'editServer')

// 定義表單規則
const formSchema = toTypedSchema(
  z.object({
    name: z
      .string()
      .min(1, { message: '伺服器名稱無法為空!' })
      .max(191, { message: '伺服器名稱無法超出 191 字元!' }),
    imageUrl: z
      .string()
      .min(1, { message: '伺服器圖片無法為空!' })
      .max(65535, { message: '伺服器圖片無法超出 191 字元!' })
  })
)

const form = useForm({
  keepValuesOnUnmount: true,
  validationSchema: formSchema,
  // 必須要填寫初始值，不然無法 custom error messages
  initialValues: {
    name: '',
    imageUrl: ''
  }
})

// TODO FileUpload 要變化

// 提交後端
const isLoading = form.isSubmitting
const onSubmit = form.handleSubmit(async (values) => {
  try {
    if (!data?.value.server?.name || !data?.value.server?.imageUrl) return
    data.value.server.name = values.name
    data.value.server.imageUrl = values.imageUrl

    const res = await server.update(data.value.server)
    if (res?.code === 0) {
      await serverDB.put('servers', {
        id: data?.value.server.id ?? '',
        profileId: data?.value.server.profileId ?? '',
        name: data?.value.server.name ?? '',
        imageUrl: data?.value.server.imageUrl ?? '',
        inviteCode: data?.value.server.inviteCode ?? ''
      })
      await clearServerCache()
      handleClose()
      refresh()
    }
  } catch (error) {
    console.error(error)
  }
})

// 獲取圖片地址
const handleChange = (value: string) => {
  form.setValues({
    name: form.values.name,
    imageUrl: value
  })
}

const handleClose = () => {
  form.resetForm()
  onClose()
}

watch(data, (newData) => {
  if (newData) {
    form.setValues({
      name: newData.server?.name ?? '',
      imageUrl: newData.server?.imageUrl ?? ''
    })
  }
})
</script>

<template>
  <Dialog :open="isModalOpen" @update:open="handleClose">
    <DialogContent class="p-0 overflow-hidden">
      <DialogHeader class="pt-8 px-6">
        <DialogTitle class="text-zinc text-center text-2xl font-bold">
          客製化您的伺服器
        </DialogTitle>
        <DialogDescription class="text-center">
          請提供伺服器的名稱與一張圖片，您可以隨後任意更換它。
        </DialogDescription>
      </DialogHeader>
      <form @submit="onSubmit" class="space-y-8">
        <div class="space-y-8 px-6">
          <FormField v-slot="{ componentField }" name="imageUrl">
            <FormItem>
              <FormControl>
                <ImageUpload :file="form.values.imageUrl" @upload="handleChange" />
                <Input v-bind="componentField" id="imageUrl" type="text" />
                <FormMessage class="text-center" />
              </FormControl>
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField }" name="name">
            <FormItem>
              <FormLabel
                class="uppercase text-sx font-bold text-zinc-500 dark:text-secondary-300/70"
                >伺服器名稱</FormLabel
              >
              <FormControl>
                <Input
                  class="bg-zinc-300/50 border-0 focus-visible:ring-0focus-visible:ring-offset-0 dark:bg-zinc-300/10"
                  :disabled="isLoading"
                  type="text"
                  placeholder="請輸入伺服器名稱"
                  v-bind="componentField"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
        </div>
        <DialogFooter class="px-6 py-4 bg-gray-100 dark:bg-zinc-300/10">
          <Button variant="default" :disabled="isLoading" type="submit"> 更新 </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
</template>
