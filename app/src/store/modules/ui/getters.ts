import { GetterTree } from 'vuex'
import { UIState } from './types'
import { RootState } from '../../types'

export const getters: GetterTree<UIState, RootState> = {
  getNotifications (state) {
    return state.notifications
  }
}
