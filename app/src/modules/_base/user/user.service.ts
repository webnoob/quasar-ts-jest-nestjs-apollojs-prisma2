import { injectable } from 'inversify-props'
import UserServiceInterface from './user.service.interface'
import UserCrudDto from './dto/userCrud.dto'
import User from './user.model'
import BaseCrudService from '../baseCrud.service'
import gql from 'graphql-tag'

@injectable()
class UserService extends BaseCrudService<UserCrudDto, User> implements UserServiceInterface<UserCrudDto, User> {
  public getUsersToMimic (needle: string): Promise<User[]> {
    return this.apolloClientService.client.query({
      variables: {
        needle
      },
      query: gql`
        query GetUsersToMimic ($needle: String!) {
          getUsersToMimic (needle: $needle) {
            id,
            username,
            role
          }
        }
      `
    }).then((r: any) => {
      return r.data.getUsersToMimic
    })
  }

  public create (dto: UserCrudDto): Promise<User> {
    return Promise.resolve(new User())
  }

  public delete (id: string): Promise<any> {
    return Promise.resolve()
  }

  public get (params?: any): Promise<User[]> {
    return Promise.resolve([new User()])
  }

  public getById (id: string): Promise<User> {
    return Promise.resolve(new User())
  }

  public update (dto: UserCrudDto): Promise<User> {
    return Promise.resolve(new User())
  }
}

export default UserService
