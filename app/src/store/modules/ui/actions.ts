import { ActionTree } from 'vuex'

import { RootState } from '../../types'
import { UIState } from './types'
import { CLEAR_NOTIFICATIONS, NOTIFY_ERROR } from '../../actions/ui'

export const actions: ActionTree<UIState, RootState> = {
  [NOTIFY_ERROR] ({ commit }, message) {
    commit(NOTIFY_ERROR, message)
  },
  [CLEAR_NOTIFICATIONS] ({ commit }) {
    commit(CLEAR_NOTIFICATIONS)
  }
}

