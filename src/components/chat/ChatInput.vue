<script setup lang="ts">
import axios from 'axios'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { useForm } from 'vee-validate'
import { Plus } from 'lucide-vue-next'

import { FormControl, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useModal } from '@/stores/modal'
import { EmojiPicker } from '@/components/emoji-picker'
import { useRouter } from 'vue-router'

// const { isOpen, type, data } = storeToRefs(useModal())
const { onOpen } = useModal()

interface ChatInputProps {
  apiUrl: string
  query: Record<string, any>
  name: string
  type: 'conversation' | 'channel'
}

const props = defineProps<ChatInputProps>()

// 定義表單規則
const formSchema = toTypedSchema(
  z.object({
    content: z.string().min(1, { message: '至少輸入 1 字元!' })
  })
)

const form = useForm({
  keepValuesOnUnmount: true,
  validationSchema: formSchema,
  // 必須要填寫初始值，不然無法 custom error messages
  initialValues: {
    content: ''
  }
})

// 提交後端
const isLoading = form.isSubmitting
const onSubmit = form.handleSubmit(async (values) => {
  try {
    // const res = await channelService.create({
    //   ...values,
    //   serverId: data.value.server?.id ?? ''
    // })
    // if (res?.code === 0) {
    //   handleClose()
    //   refresh()
    // }
  } catch (error) {
    console.error(error)
  }
})
</script>

<template>
  <form @submit="onSubmit">
    <FormField v-slot="{ componentField }" name="content">
      <FormItem>
        <FormControl>
          <div class="relative p-4 pb-6">
            <button
              type="button"
              class="absolute top-7 left-8 h-[24px] w-[24px] bg-zinc-500 dark:bg-zinc-400 hover:bg-zinc-600 dark:hover:bg-zinc-300 transition rounded-full p-1 flex items-center justify-center"
            >
              <Plus class="text-white dark:text-[#313338]" />
            </button>
            <Input
              :disabled="isLoading"
              class="px-14 py-6 bg-zinc-200/90 dark:bg-zinc-700/75 border-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-zinc-600 dark:text-zinc-200"
              :placeholder="`給 ${props.type === 'conversation' ? props.name : '#' + name} 傳訊息`"
              v-bind="componentField"
              autocomplete="off"
            />
            <div class="absolute top-7 right-8">
              <!-- <EmojiPicker
                  onChange={(emoji: string) => field.onChange(`${field.value} ${emoji}`)}
                /> -->
            </div>
          </div>
        </FormControl>
      </FormItem>
    </FormField>
  </form>
</template>
