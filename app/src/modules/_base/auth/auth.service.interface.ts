import User from '../user/user.model'

export default interface IAuthService {
  login (username: string, password: string): Promise<User>
}
