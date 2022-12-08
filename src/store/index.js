import { createStore } from 'vuex'

export default createStore({
  state: {
    fileTree: null,
    history: [],
    previousCmdStack: [],
    path: ['~'],
    cleared: false,
  },
  getters: {
  },
  mutations: {
    pushHistory(state, cmd) {
      state.history.push(cmd)
    },
    cls(state) {
      state.history = [];
      state.cleared = true;
    },
    setResult(state, res) {
      state.history[state.history.length - 1].result = res
    },
    pushCmdStack(state, cmd) {
      if (cmd.trim()) {
        if (state.previousCmdStack.includes(cmd)) {
          state.previousCmdStack
              .splice(state.previousCmdStack.indexOf(cmd), 1)
        }
        state.previousCmdStack.unshift(cmd)
      }
    },
    setPath(state, path) {
      state.path = path
    },
    setFileTree(state, fileTree) {
        state.fileTree = fileTree
    }
  },
  actions: {
  },
  modules: {
  }
})
