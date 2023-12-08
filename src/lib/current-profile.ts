import { useUser } from 'vue-clerk'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

export const currentProfile = async () => {
  const { token, profile, handleLogout } = useAuthStore()
  if (token !== '' && !!profile) return profile

  const { user } = useUser()
  const router = useRouter()

  try {
    if (!user.value || !profile) throw new Error('User did not login.')
    return profile
  } catch (error) {
    // console.error(error)
    handleLogout()
    router.push(import.meta.env.VITE_PUBLIC_SIGN_IN_URL)
  }
}
