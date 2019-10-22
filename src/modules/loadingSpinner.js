const state = {
  spinning: false
}

const getters = {
  /**
   *
   * @param state
   * @return {boolean}
   */
  spinning (state) {
    return state.spinning
  }
}

const mutations = {
  /**
   *
   * @param state
   * @param isSpinning
   */
  setSpinning (state, isSpinning) {
    state.spinning = isSpinning
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations
}
