import { useAuthStore } from '@/stores/auth'
import axios, {
  type InternalAxiosRequestConfig,
  type AxiosInstance,
  type AxiosResponse
} from 'axios'

const axiosInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_HOST,
  timeout: 5000
})

// 請求攔截器
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const { token } = useAuthStore()

    // 如果有 jwt 就傳入
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error: any) => Promise.reject(error)
)

// 回應攔截器
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: any) => {
    if (error.response.status === 401) {
      const { handleLogout } = useAuthStore()
      handleLogout()
    }
    return Promise.reject(error)
  }
)

export default axiosInstance
