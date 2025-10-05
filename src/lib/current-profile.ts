import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

export const currentProfile = async () => {
  const { token, profile, handleLogout } = useAuthStore()
  if (token !== '' && !!profile) return profile
  const router = useRouter()

  try {
    return profile
  } catch (error) {
    // console.error(error)
    handleLogout()
    router.push(import.meta.env.VITE_PUBLIC_SIGN_IN_URL)
  }
}
