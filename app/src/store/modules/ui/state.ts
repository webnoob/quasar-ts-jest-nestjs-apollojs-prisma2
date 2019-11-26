import { UIState, UINotification } from './types'

const resetNotificationState = (): UINotification[] => {
  return []
}

export default (): UIState => ({
  notifications: resetNotificationState()
})

export { resetNotificationState }
