import { BootFileParams } from 'quasar'
import NotificationMixin from 'src/components/mixins/notifications'

export default async ({ Vue }: BootFileParams) => {
  Vue.mixin(NotificationMixin)
}
