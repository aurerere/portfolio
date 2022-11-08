import { createStore } from 'vuex'

export default createStore({
  state: {
    history: [],
    previousCmdStack: [],
    path: ['~'],
  },
  getters: {
  },
  mutations: {
    pushHistory(state, cmd) {
      state.history.push(cmd)
    },
    cls(state) {
      state.history = []
    },
    setResult(state, res) {
      state.history[state.history.length -1].result = res
    }
  },
  actions: {
  },
  modules: {
  }
})
