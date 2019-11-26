<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
import { Getter } from 'vuex-class'
import { UINotification } from './store/modules/ui/types'
import { CLEAR_NOTIFICATIONS } from './store/actions/ui'

@Component({
  async preFetch (/*{ store }*/) {
    // await store.dispatch(AUTH_LOAD)
  }
})
export default class AppComponent extends Vue {
  @Getter('getNotifications') getNotifications!: boolean

  @Watch('getNotifications')
  onGetNotifications(to: UINotification[]) {
    if (to.length) {
      for (let notification of to) {
        this.$q.notify({
          message: notification.message
        })
      }
      this.$store.dispatch(CLEAR_NOTIFICATIONS)
    }
  }
}
</script>
