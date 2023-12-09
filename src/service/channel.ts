import { get, post, patch, del, type ApiResult } from '@/service/api'
import type { Server } from '@/service/server'

export type Channel = Server & { type?: string; serverId: string }

// find channels on Server
export async function find(data?: Channel): Promise<ApiResult<Array<Channel>> | undefined> {
  const response: ApiResult<Array<Channel>> = await get('/api/v1/channel', data)
  return response
}

// create a channel on Server
export async function create(data?: Channel): Promise<ApiResult<Channel> | undefined> {
  const response: ApiResult<Channel> = await post('/api/v1/channel', data)
  return response
}

// update a channel on Server
export async function update(data?: Channel): Promise<ApiResult<Channel> | undefined> {
  const response: ApiResult<Channel> = await patch('/api/v1/channel', data)
  return response
}

// delete a channel on Server
export async function drop(data?: Channel): Promise<ApiResult<Channel> | undefined> {
  const response: ApiResult<Channel> = await del('/api/v1/channel', data)
  return response
}
