import { AxiosError } from 'axios'

import User from '../user/user.model'

export interface AuthServiceError extends AxiosError { }

export interface LoginToken {
  data: string,
  expires: number
}

export interface LoginResult {
  user: User,
  token: LoginToken,
  mimicUser: User | null
}

export default interface AuthServiceInterface {
  login (username: string, password: string): Promise<LoginResult>
  logout (): Promise<any>
  setMimicUser (user: User): Promise<LoginResult>
}
