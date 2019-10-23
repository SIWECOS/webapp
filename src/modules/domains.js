import Api from '../services/api'

const state = {
  domains: [],
  scanId: null
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
   * @return {*}
   */
  scanId (state) {
    return state.scanId
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
  },

  /**
   *
   * @param state
   */
  clearDomains (state) {
    state.domains = []
  },

  /**
   *
   * @param state
   * @param id
   */
  setScanId (state, id) {
    state.scanId = id
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
