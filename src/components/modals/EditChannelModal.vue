<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import * as channelService from '@/service/channel'
import { useForm } from 'vee-validate'
import { VisuallyHidden } from 'radix-vue'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '../ui/input'
import { Button } from '@/components/ui/button'
import { useModal } from '@/stores/modal'
import { computed, inject, watch } from 'vue'
import { storeToRefs } from 'pinia'

const { isOpen, type, data } = storeToRefs(useModal())
const { onClose } = useModal()

const refresh: any = inject('reload')

const isModalOpen = computed(() => isOpen.value && type.value === 'editChannel')

// 定義表單規則
const formSchema = toTypedSchema(
  z.object({
    name: z
      .string()
      .min(1, { message: '頻道名稱無法為空!' })
      .max(191, { message: '頻道名稱無法超出 191 字元!' })
      .refine((name) => name !== 'general', { message: `頻道名稱無法叫做'general'！` }),
    type: z
      .string()
      .min(1, { message: '頻道類型無法為空!' })
      .max(65535, { message: '頻道類型無法超出 191 字元!' })
  })
)

const form = useForm({
  keepValuesOnUnmount: true,
  validationSchema: formSchema,
  // 必須要填寫初始值，不然無法 custom error messages
  initialValues: {
    name: '',
    type: 'TEXT'
  }
})

// 提交後端
const isLoading = form.isSubmitting
const onSubmit = form.handleSubmit(async (values) => {
  try {
    const res = await channelService.update({
      ...values,
      serverId: data.value.channel?.serverId ?? ''
    })
    if (res?.code === 0) {
      handleClose()
      refresh()
    }
  } catch (error) {
    console.error(error)
  }
})

const handleClose = () => {
  form.resetForm()
  onClose()
}

watch(data, (n) => {
  form.setValues({
    name: n?.channel?.name ?? '',
    type: n?.channel?.type
  })
})
</script>

<template>
  <Dialog :open="isModalOpen" @update:open="handleClose">
    <DialogContent class="p-0 overflow-hidden">
      <DialogHeader class="pt-8 px-6">
        <DialogTitle class="text-zinc text-center text-2xl font-bold"> 編輯頻道 </DialogTitle>
        <VisuallyHidden asChild>
          <DialogDescription />
        </VisuallyHidden>
      </DialogHeader>
      <form @submit="onSubmit" class="space-y-8">
        <div class="space-y-8 px-6">
          <FormField v-slot="{ componentField }" name="type">
            <FormItem>
              <FormLabel
                class="uppercase text-sx font-bold text-zinc-500 dark:text-secondary-300/70"
                >頻道類型</FormLabel
              >
              <FormControl>
                <Select
                  class="bg-zinc-300/50 border-0 text-black capitalize outline-none"
                  :disabled="isLoading"
                  v-bind="componentField"
                >
                  <SelectTrigger>
                    <SelectValue placeholder="請選擇頻道類型" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="TEXT">文字頻道</SelectItem>
                    <SelectItem value="AUDIO">語音頻道</SelectItem>
                    <SelectItem value="VIDEO">影音頻道</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField }" name="name">
            <FormItem>
              <FormLabel
                class="uppercase text-sx font-bold text-zinc-500 dark:text-secondary-300/70"
                >頻道名稱</FormLabel
              >
              <FormControl>
                <Input
                  class="bg-zinc-300/50 border-0 focus-visible:ring-0focus-visible:ring-offset-0 dark:bg-zinc-300/10"
                  :disabled="isLoading"
                  type="text"
                  placeholder="請輸入頻道名稱"
                  v-bind="componentField"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
        </div>
        <DialogFooter class="px-6 py-4 bg-gray-100 dark:bg-zinc-300/10">
          <Button variant="default" :disabled="isLoading" type="submit"> 建立 </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
</template>
