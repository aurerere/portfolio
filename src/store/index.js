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
      state.history[state.history.length - 1].result = res
    },
    pushPreviousCmd(state, cmd) {
      if (state.previousCmdStack.includes(cmd)) {
        state.previousCmdStack
          .splice(state.previousCmdStack.indexOf(cmd), 1)
      }
      state.previousCmdStack.unshift(cmd)
    }
  },
  actions: {
  },
  modules: {
  }
})
