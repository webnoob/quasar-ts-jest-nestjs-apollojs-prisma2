import { injectable } from 'inversify-props'
import { Store } from 'vuex'

import StoreServiceInterface from './store.service.interface'
import { RootState } from '../../store/types'

@injectable()
class StoreService implements StoreServiceInterface {
  public store!: Store<RootState>

  public configure (store: Store<RootState>): void {
    this.store = store
  }
}

export default StoreService
