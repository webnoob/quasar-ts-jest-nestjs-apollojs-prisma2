import User from 'src/modules/_base/user/user.model'
import { LoginToken } from 'src/modules/_base/auth/auth.service.interface'

export interface AuthState {
  token: LoginToken,
  user: User | null,
  mimicUser: User | null
}

