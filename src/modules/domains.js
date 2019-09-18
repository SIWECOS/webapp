import Api from '../services/api'

const state = {
  domains: []
}

const getters = {
  /**
   *
   * @param state
   * @return {*}
   */
  domains (state) {
    return state.domains
  },

  /**
   *
   * @param state
   * @return {function(*): T[]}
   */
  filterByDomainName: (state) => (domain) => {
    return state.domains.filter(item => item.domain === domain)
  }
}

const mutations = {
  /**
   *
   * @param state
   * @param domains
   */
  setDomains (state, domains) {
    state.domains = domains
  }
}

const actions = {
  /**
   *
   * @param commit
   */
  async fetch ({ commit } = {}) {
    try {
      const api = new Api()
      const { domains } = await api.get('domain')

      commit('setDomains', domains)
    } catch (e) {
      throw e
    }
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
