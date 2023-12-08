import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
// import { camelize, getCurrentInstance, toHandlerKey } from 'vue'
import { get } from '@/service/api'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const useOrigin = () => {
  const origin: string =
    typeof window !== 'undefined' && window.location.origin ? window.location.origin : ''
  return origin
}

export const getPosType = (): string => {
  const agent = navigator.userAgent.toLowerCase()
  const isMac = /macintosh|mac os x/i.test(navigator.userAgent)
  if (agent.indexOf('win32') >= 0 || agent.indexOf('wow32') >= 0) {
    return 'win32'
  }
  if (agent.indexOf('win64') >= 0 || agent.indexOf('wow64') >= 0) {
    return 'win64'
  }
  if (isMac) {
    return 'mac'
  }

  return 'linux'
}
