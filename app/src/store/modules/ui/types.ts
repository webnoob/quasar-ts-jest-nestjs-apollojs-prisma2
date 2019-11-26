export enum UINotificationType {
  Error = 0,
  Standard = 1
}

export interface UINotification {
  type: UINotificationType,
  message: string
}

export interface UIState {
  notifications: UINotification[]
}
