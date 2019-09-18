import Vue from 'vue'
import Vuex from 'vuex'
import account from './modules/account'
import domains from './modules/domains'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    account: {
      namespaced: true,
      ...account
    },
    domains: {
      namespaced: true,
      ...domains
    }
  }
})
