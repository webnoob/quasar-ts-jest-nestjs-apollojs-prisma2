import { MutationTree } from 'vuex'
import { UIState, UINotification, UINotificationType } from './types'
import { CLEAR_NOTIFICATIONS, NOTIFY_ERROR } from '../../actions/ui'
import { resetNotificationState } from './state'

export const mutations: MutationTree<UIState> = {
  [NOTIFY_ERROR] (state: UIState, message: string) {
    const notification: UINotification = {
      type: UINotificationType.Error,
      message
    }
    state.notifications.push(notification)
  },
  [CLEAR_NOTIFICATIONS] (state) {
    state.notifications = resetNotificationState()
  }
}
