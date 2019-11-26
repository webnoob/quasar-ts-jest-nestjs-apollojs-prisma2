import { Module } from 'vuex'
import userState from './state'
import { getters } from './getters'
import { mutations } from './mutations'
import { actions } from './actions'
import { UserState } from './types'
import { RootState } from '../../types'

export const user: Module<UserState, RootState> = {
  state: userState,
  getters,
  mutations,
  actions
}
