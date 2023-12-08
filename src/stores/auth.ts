import { ref } from 'vue'
import { defineStore } from 'pinia'
import { type Profile } from '@/service/profile'

import { useClerk } from 'vue-clerk'

export const useAuthStore = defineStore(
  'auth',
  () => {
    const token = ref<string>('')
    const profile = ref<Profile | null>(null)
    const { signOut } = useClerk()

    const handleLogin = (_profile: Profile, _token: string): void => {
      profile.value = _profile
      token.value = _token
    }

    const handleLogout = (): void => {
      signOut()
      token.value = ''
      profile.value = null
    }

    return { token, profile, handleLogin, handleLogout }
  },
  { persist: true }
)
