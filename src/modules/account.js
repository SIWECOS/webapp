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
    state.user = user
  }
}

const getters = {
  /**
   *
   * @param state
   * @return {getters.user|(function(*))|state.user|{}|*|number}
   */
  user (state) {
    return state.user
  }
}

const actions = {
  async fetchUser ({ commit }) {
    commit('setUser', await Api.get('v2/user'))
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}
