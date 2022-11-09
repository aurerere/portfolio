import store from "@/store";

export default {
  'cls': () => {
    store.commit('cls')
    return 'ok';
  },
  'ping': async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve('pong')
      }, 1000)
    })
  },
}