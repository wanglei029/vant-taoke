import * as types from './mutation-types'
import { setItem, removeItem } from '@/utils/storage'
const mutations = {
  [types.SET_USER] (state, user) {
    state.user = user
    // window.localStorage.setItem('user', JSON.stringify(state.user))
    setItem('user', state.user)
  },
  checkout (state) {
    state.user = null
    removeItem('user')
  }
}
export default mutations
