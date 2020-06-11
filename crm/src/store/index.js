import Vue from 'vue'
import Vuex from 'vuex'
import state from './state.js'
/* import * as mutations from './mutations.js'  *///所有导出都放在mutations对象中
import mutations from './mutations.js'
import actions from './actions.js'
Vue.use(Vuex)

export default new Vuex.Store({
  state,
  mutations,
  actions,
  modules: {
  }
})
