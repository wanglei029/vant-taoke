import { getItem } from '@/utils/storage'

const state = {
  // user: JSON.parse(window.localStorage.getItem('user'))
  user: getItem('user')
}
export default state
