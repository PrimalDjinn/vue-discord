import axios, {
  type InternalAxiosRequestConfig,
  type AxiosInstance,
  type AxiosResponse
} from 'axios'

const axiosInstance: AxiosInstance = axios.create({
  baseURL: '/',
  timeout: 5000
})

// 請求攔截器
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => config,
  (error: any) => Promise.reject(error)
)

// 回應攔截器
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: any) => Promise.reject(error)
)

export default axiosInstance
