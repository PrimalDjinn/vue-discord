import { post, patch, del, type ApiResult } from '@/service/api'
import type { Profile } from '@/service/profile'
import type { Server, ServerDetail } from '@/service/server'

export type Member = Profile & { profileId?: string; role?: string; serverId?: string }

// invite to Server
export async function invite(data?: Server): Promise<ApiResult<Server> | undefined> {
  const response: ApiResult<Server> = await post('/api/v1/member', data)
  return response
}

// update member on Server
export async function update(data?: Member): Promise<ApiResult<ServerDetail> | undefined> {
  const response: ApiResult<ServerDetail> = await patch('/api/v1/member', data)
  return response
}

// kick member on Server
export async function drop(data?: Member): Promise<ApiResult<ServerDetail> | undefined> {
  const response: ApiResult<ServerDetail> = await del('/api/v1/member', data)
  return response
}
