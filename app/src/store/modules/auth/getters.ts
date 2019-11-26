import { GetterTree } from 'vuex'
import { AuthState } from './types'
import { RootState } from '../../types'

export const getters: GetterTree<AuthState, RootState> = {
  isAuthenticated (state) {
    return state.token.data !== '' && state.token.expires > new Date().getTime() / 1000
  },
  authToken (state) {
    return state.token.data
  },
  authenticatedUser (state) {
    return state.user
  },
  mimicUser (state) {
    return state.mimicUser
  }
}
