import { Store } from 'vuex'
import { RootState } from '../../store/types'

export default interface StoreServiceInterface {
  configure (store: Store<RootState>): void
}
