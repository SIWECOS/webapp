import Api from '../services/api'
import env from '../../env'

const state = {
  token: '',
  account: {}
}

const mutations = {
  /**
   *
   * @param state
   * @param token
   */
  setToken (state, token) {
    sessionStorage.setItem(env.ID_TOKEN, token)

    state.token = token
  },
  /**
   *
   * @param state
   * @param account
   */
  setAccount (state, account) {
    state.account = account
  }
}

const getters = {
  /**
   *
   * @param state
   * @return {*}
   */
  token (state) {
    return Object.keys(state.token).length ? state.token : sessionStorage.getItem('token')
  },
  /**
   *
   * @param state
   * @return {getters.account|(function(*))|state.account|{}|*|modules.account}
   */
  account (state) {
    return state.account
  }
}

const actions = {
  /**
   *
   * @param commit
   * @param email
   * @param password
   * @param remember
   * @return {Promise<void>}
   */
  async login ({ commit } = {}, { email, password, remember } = {}) {
    const api = new Api()

    if (!email || !password) return

    try {
      const { token } = await api.create('user/login', { email, password })

      if (remember && token) {
        commit('setToken', token)
      }
    } catch (e) {
      throw e
    }
  },
  async fetch ({ commit } = {}) {
    const api = new Api()

    try {
      commit('setAccount', await api.get('user'))
    } catch (e) {
      throw e
    }
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}
