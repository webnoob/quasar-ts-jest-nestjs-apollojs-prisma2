import { UserState } from './types'

const resetUserState = (): UserState => {
  return {
  }
}

export default (): UserState => ({
  ...resetUserState()
})

export { resetUserState }
