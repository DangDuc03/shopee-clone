import type { User } from './user.type'
import type { ResponseAPI } from './utils.type'

export type AuthResponse = ResponseAPI<{
  access_token: string
  refresh_token: string
  expires: string
  expires_refresh_token: string
  user: User
}>
