import Vue from 'vue'
import Vuex, { StoreOptions } from 'vuex'

import { book } from './book'
import { IRootState } from './types'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */


const store: StoreOptions<IRootState> = {
  modules: {
    book
  },

  // enable strict mode (adds overhead!)
  // for dev mode only
  strict: !!process.env.DEV
}

export default new Vuex.Store<IRootState>(store);
