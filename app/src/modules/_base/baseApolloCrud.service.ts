import { inject } from 'inversify-props'

import ICrudService from './baseCrud.service.interface'
import ApolloClientService from './apollo/apolloClient.service'

export default abstract class BaseApolloCrudService<DTO, T> implements ICrudService<DTO, T> {
  /**
   * Our Apollo Client instance.
   * Note: Will (and should) be a singleton.
   */
  @inject()
  public readonly apolloClientService!: ApolloClientService

  abstract create (dto: DTO): Promise<T>

  abstract delete (id: number): Promise<any>

  abstract get (params?: any): Promise<T[]>

  abstract getById (id: number): Promise<T>

  abstract update (dto: DTO): Promise<T>
}
