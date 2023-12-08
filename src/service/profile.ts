import { post, type ApiResult } from '@/service/api'

// Profile 基本結構
export type Profile = {
  id?: string
  userId?: string
  name?: string | null
  imageUrl?: string
  email?: string | null
}

// 登入使用
export type Token = { token?: string | null }
export type ProfileWithToken = Profile & Token

// 獲取唯一使用者，沒有就建立一個
export async function getUniqueOrCreate(
  params: Token
): Promise<ApiResult<ProfileWithToken> | undefined> {
  const response: ApiResult<Profile> = await post('/api/v1/login', params)
  return response
}
