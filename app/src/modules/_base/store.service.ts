import IStoreService from './store.service.interface'
import { inject, injectable } from 'inversify-props'

@injectable()
class StoreService implements IStoreService {
  public constructor () {}

  public dispatch (): Promise<any> {
    return Promise.resolve()
  }

}
