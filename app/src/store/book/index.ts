import { Module } from 'vuex'
import BookState from './state'
import { getters } from './getters'
import { mutations } from './mutations'
import { actions } from './actions'
import { IBookState } from './types'
import { IRootState } from '../types'

export const state: IBookState = {
  ...BookState
}

const namespaced: boolean = true

export const book: Module<IBookState, IRootState> = {
  namespaced,
  state,
  getters,
  mutations,
  actions
}
