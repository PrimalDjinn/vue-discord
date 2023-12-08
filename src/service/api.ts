import axiosInstance from '@/lib/request'

// Api 結果資料結構
export interface ApiResult<T> {
  code: number
  msg: string
  data: T
}

export async function get<T>(url: string, params?: any): Promise<ApiResult<T>> {
  const response = await axiosInstance.get<ApiResult<T>>(url, { params })
  return response.data
}

export async function post<T>(url: string, data?: any): Promise<ApiResult<T>> {
  const response = await axiosInstance.post<ApiResult<T>>(url, data)
  return response.data
}

export async function put<T>(url: string, data?: any): Promise<ApiResult<T>> {
  const response = await axiosInstance.put<ApiResult<T>>(url, data)
  return response.data
}

export async function patch<T>(url: string, data?: any): Promise<ApiResult<T>> {
  const response = await axiosInstance.patch<ApiResult<T>>(url, data)
  return response.data
}

export async function del<T>(url: string, data?: any): Promise<ApiResult<T>> {
  const response = await axiosInstance.delete<ApiResult<T>>(url, { data: data })
  return response.data
}
