import { AuthState } from './types'

const resetAuthState = (): AuthState => {
  return {
    user: null,
    token: {
      data: '',
      expires: 0
    },
    mimicUser: null
  }
}

export default (): AuthState => ({
  ...resetAuthState()
})

export { resetAuthState }
