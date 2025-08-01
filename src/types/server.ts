export interface Server {
  id: number
  username: string | null
  host_url: string
  status: number
  kasm_id: string | null
  kasm_info: string | null
  createdAt: Date
  updatedAt: Date
}

export interface CreateServerData {
  username?: string | null
  host_url: string
  status?: number
}

export interface UpdateServerData {
  username?: string | null
  host_url?: string
  status?: number
}

export enum ServerStatus {
  INACTIVE = 0,
  ACTIVE = 1
}

export const getServerStatusText = (status: number): string => {
  return status === ServerStatus.ACTIVE ? 'Active' : 'Inactive'
}

export const getServerStatusColor = (status: number): string => {
  return status === ServerStatus.ACTIVE 
    ? 'text-green-400 bg-green-400/20' 
    : 'text-red-400 bg-red-400/20'
}