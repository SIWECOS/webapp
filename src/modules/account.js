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

export default {
  state,
  mutations,
  getters,
}
