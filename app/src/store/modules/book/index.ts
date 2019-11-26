import { Module } from 'vuex'
import bookState from './state'
import { getters } from './getters'
import { mutations } from './mutations'
import { actions } from './actions'
import { BookState } from './types'
import { RootState } from '../../types'

export const state: BookState = {
  ...bookState
}

const namespaced = true

export const book: Module<BookState, RootState> = {
  namespaced,
  state,
  getters,
  mutations,
  actions
}
