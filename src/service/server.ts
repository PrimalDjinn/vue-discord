import { get, type ApiResult } from '@/service/api'

// TODO 要修改
export type Server = {
  id?: string
  userId?: string
  name?: string | null
  imageUrl?: string
  email?: string
}

// 獲取第一個 Server
export async function getFirst(params?: {
  profileId: string | undefined
}): Promise<ApiResult<Server> | undefined> {
  const response: ApiResult<Server> = await get('/api/server/first', params)
  return response
}
