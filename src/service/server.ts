import { get, post, patch, del, type ApiResult } from '@/service/api'
import type { Member } from '@/service/member'
import type { Channel } from '@/service/channel'

export type Server = {
  id?: string
  profileId?: string
  name?: string | null
  imageUrl?: string
  inviteCode?: string | null
}

export type ServerDetail = Server & {
  members: Array<Member> | null
  channels: Array<Channel> | null
}
export type ServerWithPage = Server & { page?: number; pagePerNum?: number }

export async function find(params?: ServerWithPage): Promise<ApiResult<Array<Server>> | undefined> {
  const response: ApiResult<Array<Server>> = await get('/api/v1/server', params)
  return response
}

export async function findOne(params?: Server): Promise<ApiResult<ServerDetail>> {
  const response: ApiResult<ServerDetail> = await get(`/api/v1/server/${params?.id}`, params)
  return response
}

export async function update(params?: Server | null) {
  const response: ApiResult<Server> = await patch(`/api/v1/server`, params)
  return response
}

// 建立 Server
export async function create(data?: Server): Promise<ApiResult<Server> | undefined> {
  const response: ApiResult<Server> = await post('/api/v1/server', data)
  return response
}

export async function drop(data?: Server): Promise<ApiResult<Server> | undefined> {
  const response: ApiResult<Server> = await del('/api/v1/server', data)
  return response
}
