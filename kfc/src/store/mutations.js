import * as TYPES from './mutation-types'
const mutations = {
  [TYPES.SET_SINGERS](state, singers) {
    state.singers = singers
  }
}
export default mutations
