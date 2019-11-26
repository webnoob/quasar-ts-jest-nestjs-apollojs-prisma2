import { Module } from 'vuex'
import authState from './state'
import { getters } from './getters'
import { mutations } from './mutations'
import { actions } from './actions'
import { AuthState } from './types'
import { RootState } from '../../types'

export const auth: Module<AuthState, RootState> = {
  state: authState,
  getters,
  mutations,
  actions
}
