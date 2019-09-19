import Vue from 'vue'
import Vuex from 'vuex'
import account from './modules/account'
import domains from './modules/domains'
import language from './modules/language'

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
    },
    language: {
      namespaced: true,
      ...language
    }
  }
})
