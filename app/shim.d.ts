import VueI18n from 'vue-i18n'
import { Cookies } from 'quasar'

declare module 'vue/types/vue' {
  interface Vue {
    i18n: VueI18n
    showMessage (message: string, ...optionalParams: any[]): void
    showError (message: string, ...optionalParams: any[]): void
  }
}

declare module 'vuex/types/index' {
  interface Store<S> {
    $cookies: Cookies
  }
}
