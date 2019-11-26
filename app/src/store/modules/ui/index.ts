import { Module } from 'vuex'
import uiState from './state'
import { getters } from './getters'
import { mutations } from './mutations'
import { actions } from './actions'
import { UIState } from './types'
import { RootState } from '../../types'

export const ui: Module<UIState, RootState> = {
  state: uiState,
  getters,
  mutations,
  actions
}
