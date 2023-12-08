import { onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
import { useSession } from 'vue-clerk'
import { useAuthStore } from '@/stores/auth'

export function useMiddleware(isSignIn: undefined | boolean, isSetup: undefined | boolean) {
  const router = useRouter()
  const { session } = useSession()
  const { token, handleLogout } = useAuthStore()
  onBeforeMount(() => {
    // 如果 clerk 登入，卻還沒登入後端 isSetup 要判斷是不是 SetupView
    if (!isSignIn || (token === '' && isSetup)) {
      handleLogout()
      session.value?.remove()
      router.push(import.meta.env.VITE_PUBLIC_SIGN_IN_URL)
    }
  })
}
