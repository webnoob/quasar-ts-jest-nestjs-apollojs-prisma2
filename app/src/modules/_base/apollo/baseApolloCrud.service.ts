import BaseCrudServiceInterface from '../baseCrud.service.interface'
import ApolloClientService from './apolloClient.service'
import { injectSingleton } from '../../diContainer'
import { injectable } from 'inversify-props'

@injectable()
export default abstract class BaseApolloCrudService<DTO, T> implements BaseCrudServiceInterface<DTO, T> {
  /**
   * Our Apollo Client instance.
   * Note: Will (and should) be a singleton.
   */
  @injectSingleton(ApolloClientService)
  public readonly apolloClientService!: ApolloClientService

  abstract create (dto: DTO): Promise<T>

  abstract delete (id: string): Promise<any>

  abstract get (params?: any): Promise<T[]>

  abstract getById (id: string): Promise<T>

  abstract update (dto: DTO): Promise<T>
}
