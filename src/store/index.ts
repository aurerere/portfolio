import { createStore } from 'vuex';
import type {State} from "@/types";

export default createStore<State>({
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
            console.log(cmd)
            state.history.push(cmd)
        },
        cls(state) {
            state.history = [];
            state.cleared = true;
        },
        setResult(state, res) {
            if (state.history.length > 0)
                state.history[state.history.length - 1].result = res;
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
