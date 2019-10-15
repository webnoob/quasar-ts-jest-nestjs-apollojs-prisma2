import { injectable } from 'inversify-props'

import ICrudService from './baseCrud.service.interface'

@injectable()
export default abstract class BaseCrudService<DTO, T> implements ICrudService<DTO, T> {
  abstract create (dto: DTO): Promise<T>

  abstract delete (id: number): Promise<any>

  abstract get (): Promise<T[]>

  abstract getById (id: number): Promise<T>

  abstract update (dto: DTO): Promise<T>
}
