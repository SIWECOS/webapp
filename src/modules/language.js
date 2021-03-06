const state = {
  language: ''
}

const getters = {
  /**
   *
   * @param state
   * @return {*}
   */
  language (state) {
    return state.language
  }
}

const mutations = {
  /**
   *
   * @param state
   * @param language
   */
  setLanguage (state, language) {
    state.language = language
  }
}

export default {
  state,
  getters,
  mutations
}
