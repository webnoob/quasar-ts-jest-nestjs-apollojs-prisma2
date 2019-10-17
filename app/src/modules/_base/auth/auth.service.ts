import { inject, injectable, container } from 'inversify-props'
import User from '../user/user.model'
import IAuthService from './auth.service.interface'
import AxiosService from '../axios/axios.service'
import { AxiosResponse } from 'axios'

@injectable()
class AuthService implements IAuthService {
  public user: User | null = null

  public get isAuthenticated (): boolean {
    return !!this.user
  }

  public constructor (
    @inject() private readonly axiosService: AxiosService
  ) { }

  public async login (username: string, password: string): Promise<User> {
    return this.axiosService.axios.post('auth/login', {
      username,
      password
    }).then((r: AxiosResponse) => {
      const user = {
        ...new User(),
        ...r.data
      }

      return this.user = user && user
    })
  }
}

export default AuthService
