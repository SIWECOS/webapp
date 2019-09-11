import Api from '../services/api'

const state = {
  user: {}
}

const mutations = {
  /**
   *
   * @param state
   * @param user
   */
  setUser (state, user) {
    sessionStorage.setItem('user', JSON.stringify(user))

    state.user = user
  }
}

const getters = {
  /**
   *
   * @param state
   * @return {*}
   */
  user (state) {
    return Object.keys(state.user).length ? state.user : sessionStorage.getItem('user')
  }
}

const actions = {
  /**
   *
   * @param commit
   * @return {Promise<void>}
   */
  async fetchUser ({ commit } = {}) {
    const api = new Api()

    commit('setUser', await api.get('user'))
  },

  /**
   *
   * @param commit
   * @param credentials
   * @return {Promise<void>}
   */
  async registerUser ({ commit } = {}, credentials) {
    const api = new Api()

    commit('setUser', await api.create('user', credentials))
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}
