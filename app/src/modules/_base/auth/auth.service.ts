import { AxiosResponse } from 'axios'
import { injectable } from 'inversify-props'

import User from '../user/user.model'
import AuthServiceInterface, { LoginResult } from './auth.service.interface'
import AxiosService from '../axios/axios.service'
import { injectSingleton } from '../../diContainer'

@injectable()
class AuthService implements AuthServiceInterface {

  public constructor (
    @injectSingleton(AxiosService) private readonly axiosService: AxiosService
  ) { }

  public async login (username: string, password: string): Promise<LoginResult> {
    return this.axiosService.axios.post('auth/login', {
      username,
      password
    }).then((r: AxiosResponse) => {
      const loginResponse: LoginResult = r.data
      const user: User = {
        ...new User(),
        ...loginResponse.user
      }

      return {
        user,
        token: {
          data: loginResponse.token.data,
          expires: loginResponse.token.expires
        },
        mimicUser: null
      }
    })
  }

  public async logout (): Promise<any> {
    return this.axiosService.axios.post('auth/logout')
  }

  public async setMimicUser (mimicUser: User): Promise<LoginResult> {
    return this.axiosService.axios.post('auth/setMimicUser', {
      id: mimicUser ? mimicUser.id : null
    }).then((r: AxiosResponse) => {
      return r.data
    })
  }
}

export default AuthService

