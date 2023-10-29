import { get, post, type ApiResult } from '@/service/api'

export type Profile = {
  id?: number
  userId?: number
  name?: string | null
  imageUrl?: string
  email?: string
}

// 獲取唯一使用者
export async function getUnique(params?: {
  userId: number
}): Promise<ApiResult<Profile> | undefined> {
  const response: ApiResult<Profile> = await get('/api/profile', params)
  return response
}

// 建立使用者
export async function create(data?: Profile): Promise<ApiResult<Profile> | undefined> {
  const response: ApiResult<Profile> = await post('/api/profile', data)
  return response
}
