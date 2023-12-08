import { useUser, useSession } from 'vue-clerk'
import { useRouter } from 'vue-router'
import { getUniqueOrCreate } from '@/service/profile'
import { useAuthStore } from '@/stores/auth'

export const initialProfile = async () => {
  const { token, profile, handleLogin, handleLogout } = useAuthStore()
  if (token !== '' && !!profile) return profile

  const router = useRouter()
  try {
    const { user } = useUser()
    // clerk 沒有 session 代表尚未登入
    if (!user.value) throw new Error('User did not login.')

    // 如果有已經是使用者，直接返回 Profile，沒有就新增一個
    const { session } = useSession()
    const token = (await session.value?.getToken()) ?? ''
    const res = await getUniqueOrCreate({ token: token })
    if (res?.code === 0) {
      handleLogin(
        {
          id: res.data.id,
          userId: user.value?.id,
          name: user.value.lastName + '' + user.value.firstName,
          imageUrl: user.value.imageUrl,
          email: user.value.emailAddresses[0]?.emailAddress
        },
        res.data.token ?? ''
      )
      return res.data
    }
  } catch (error) {
    console.error(error)
    handleLogout()
    router.push(import.meta.env.VITE_PUBLIC_SIGN_IN_URL)
  }
}
