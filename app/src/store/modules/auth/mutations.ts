import { MutationTree } from 'vuex'

import { LoginResult } from 'src/modules/_base/auth/auth.service.interface'
import { AUTH_LOAD, AUTH_LOGOUT, AUTH_SUCCESS } from '../../actions/auth'
import { AuthState } from './types'
import { resetAuthState } from './state'

export const mutations: MutationTree<AuthState> = {
  [AUTH_LOAD] (state: AuthState, data: LoginResult) {
    state.user = data.user
    state.mimicUser = data.mimicUser
    state.token = data.token
  },
  [AUTH_SUCCESS] (state: AuthState, loginResult: LoginResult) {
    state.token = loginResult.token
    state.user = loginResult.user

    if (loginResult.mimicUser !== null) {
      state.mimicUser = loginResult.mimicUser
    } else {
      // We've got an auth with no mimic, make sure we're don't have an existing one set.
      state.mimicUser = null
    }
  },
  [AUTH_LOGOUT] (state: AuthState) {
    Object.assign(state, resetAuthState())
  }
}
