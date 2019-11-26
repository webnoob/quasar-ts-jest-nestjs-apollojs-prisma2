import User from './user.model'

export default interface UserServiceInterface<DTO, T> {
  getUsersToMimic (needle: string): Promise<User[]>
}
