import Vue from 'vue'
import Vuex, { Store } from 'vuex'

import { book } from './modules/book'
import { auth } from './modules/auth'
import { ui } from './modules/ui'
import { user } from './modules/user'
import { RootState } from './types'

import { buildDependencyContainer } from '../modules/diContainer'
import { QSsrContext } from 'quasar'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

let store: Store<RootState>

export default function ({ ssrContext }: { ssrContext: QSsrContext }) {
  store = new Vuex.Store( {
    modules: {
      book,
      auth,
      ui,
      user
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: !!process.env.DEV
  })

  buildDependencyContainer(ssrContext, store)

  return store
}

export { store }
