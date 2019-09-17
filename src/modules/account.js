import Api from '../services/api'

const state = {
  token: {}
}

const mutations = {
  /**
   *
   * @param state
   * @param token
   */
  setToken (state, token) {
    sessionStorage.setItem('token', JSON.stringify(token))

    state.token = token
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
  }
}

const actions = {
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
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}
