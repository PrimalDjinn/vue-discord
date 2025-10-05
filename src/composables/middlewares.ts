import { onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

export function useMiddleware(isSignIn: undefined | boolean, isSetup: undefined | boolean) {
  const router = useRouter()
  const { token, handleLogout } = useAuthStore()
  onBeforeMount(() => {})
}
