import { ActionTree } from 'vuex'

import { container } from 'src/modules/diContainer'
import AuthService from 'src/modules/_base/auth/auth.service'
import { router } from 'src/router/index'
import { LoginResult } from 'src/modules/_base/auth/auth.service.interface'
import { RootState } from '../../types'
import { AuthState } from './types'
import { NOTIFY_ERROR } from '../../actions/ui'
import {
  AUTH_INVALID,
  AUTH_LOAD,
  AUTH_LOGOUT,
  AUTH_LOGOUT_REQUEST,
  AUTH_REQUEST,
  AUTH_REQUIRED,
  AUTH_SUCCESS,
  SET_MIMIC_USER
} from '../../actions/auth'
import User from '../../../modules/_base/user/user.model'

export const actions: ActionTree<AuthState, RootState> = {
  [AUTH_LOAD] ({ commit }): void {
    const
      userCookie = this.$cookies.get('user'),
      user = userCookie ? userCookie as unknown as User : null,
      mimicUserCookie = this.$cookies.get('muser'),
      mimicUser = mimicUserCookie ? mimicUserCookie as unknown as User : null

    const loginState = {
      user,
      token: {
        data: this.$cookies.get('user-token'),
        expires: parseInt(this.$cookies.get('user-token-expires'))
      },
      mimicUser
    }
    commit(AUTH_LOAD, loginState)
  },
  [AUTH_REQUEST] ({ commit }, payload): Promise<LoginResult> {
    const authService: AuthService = container.get(AuthService)

    return authService.login(payload.username, payload.password).then((loginResult: LoginResult) => {
      this.$cookies.set('user-token', loginResult.token.data)
      this.$cookies.set('user-token-expires', loginResult.token.expires.toString())
      this.$cookies.set('user', JSON.stringify(loginResult.user))

      if (loginResult.mimicUser !== null) {
        // @ts-ignore
        this.$cookies.set('muser', JSON.stringify(loginResult.mimicUser))
      } else {
        this.$cookies.remove('muser')
      }

      commit(AUTH_SUCCESS, loginResult)
      return loginResult
    })
  },
  [AUTH_REQUIRED] ({ dispatch }) {
    dispatch(AUTH_LOGOUT)
    router.push('/login') // This could trigger a popup or something to stay on the same page if needs be.
  },
  [AUTH_LOGOUT] ({ commit }) {
    this.$cookies.remove('user-token')
    this.$cookies.remove('user-token-expires')
    this.$cookies.remove('user')
    this.$cookies.remove('muser')

    commit(AUTH_LOGOUT)
  },
  [AUTH_LOGOUT_REQUEST] ({ dispatch }) {
    const authService: AuthService = container.get(AuthService)

    authService.logout().then(() => {
      dispatch(AUTH_LOGOUT)
    })
  },
  [AUTH_INVALID] ({ dispatch }) {
    // This would be replaced by a translated version and also dispatch something so the user is prompted
    // to upgrade. UPSELL UPSELL UPSELL!
    dispatch(NOTIFY_ERROR, 'You do not have permission to do this.')
  },
  [SET_MIMIC_USER] ({ commit }, user) {
    const authService: AuthService = container.get(AuthService)

    authService.setMimicUser(user).then((result: LoginResult) => {
      // This will set the mimicUser and update all our tokens so we have a secure way of the server
      // knowing which user we're mimicing as it'll be baked into the auth token which is signed server side.
      commit(AUTH_SUCCESS, result)
    })
  }
}

