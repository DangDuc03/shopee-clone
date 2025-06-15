import { type User } from './user.type'
import type { SuccessResponseAPI } from './utils.type'

export type AuthResponse = SuccessResponseAPI<{
  access_token: string
  refresh_token: string
  expires: string
  expires_refresh_token: string
  user: User
}>
