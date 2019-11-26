import { User } from '../user/model/user'

interface LoginToken {
  data: string,
  expires: number
}

export interface LoginResult {
  user: User,
  token: LoginToken,
  mimicUser?: User
}
