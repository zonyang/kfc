import Vuex from 'vuex'
import Vue from 'vue'
import getters from './getter'
import mutations from './mutations'
import state from './state'

Vue.use(Vuex)
export default new Vuex.Store({
  state,
  getters,
  mutations
})
// const store = new Vuex.Store({
//   state: {
//     singers: []
//   },
//   getters: {
//     getSingers: state => {
//       return state.singers
//     }
//   },
//   mutations: {
//     [SET_SINGER](state, singers) {
//       state.singers = singers
//     }
//   }
// })
