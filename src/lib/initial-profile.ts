import { useUser } from 'vue-clerk'
import { useRouter } from 'vue-router'
import { getUnique, create, type Profile } from '@/service/profile'
import type { ApiResult } from '@/service/api'

export const initialProfile = async () => {
  const { user } = useUser()

  if (!user.value) {
    const router = useRouter()
    router.push(import.meta.env.VITE_PUBLIC_SIGN_IN_URL)
  }

  // 如果有已經是使用者，直接返回 Profile
  try {
    const res1: ApiResult<Profile> | undefined = await getUnique({ userId: user.value?.id })
    if (res1?.data) return res1.data
  } catch (error) {
    console.error(error)
  }

  // 如果不是使用者，那就要新增
  try {
    const res2: ApiResult<Profile> | undefined = await create({
      userId: user.value?.id,
      name: user.value?.fullName,
      imageUrl: user.value?.imageUrl,
      email: user.value?.emailAddresses[0].emailAddress
    })
    if (res2?.data) return res2.data
  } catch (error) {
    console.error(error)
  }
}
