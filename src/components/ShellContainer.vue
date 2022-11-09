<template>
  <p>
    <template v-for="command in history" :key="command">
      <ShellPromptText :path="command.path" /> {{ command.input }}
      <br v-if="command.result"/>
      <ShellResultParser v-if="command.result" :result="command.result"/>
      <br />
    </template>
  </p>
  <form @submit.prevent="runCommand" v-if="!loading">
    <p>
      <ShellPromptText :path="path"/>
    </p>
    <input
      id="prompt"
      autofocus
      @keydown="inputArrowHooker"
      autocomplete="off"
      spellcheck="false"
      v-model="input">
  </form>
  <p v-else><span class="loader">{{ loader }}</span> Loading</p>

</template>

<script>
import ShellPromptText from "@/components/ShellPromptText";
import commands from "@/utils/commands";
import ShellResultParser from "@/components/ShellResultParser";

export default {
  name: "ShellContainer",
  components: { ShellResultParser, ShellPromptText },
  data() {
    return {
      loading: false,
      input: '',
      loader: '|',
      stackState: -1,
    };
  },
  computed: {
    path() {
      return this.$store.state.path;
    },
    history() {
      return this.$store.state.history;
    },
    previousCmdStack() {
      return this.$store.state.previousCmdStack;
    },
  },
  methods: {
    async runCommand() {
      this.setLoading(true)

      const command = this.input.split(' ')[0].toLowerCase();
      const args = this.input.split(' ').slice(1);

      this.$store.commit('pushHistory', {path: this.path, input: this.input});
      this.input.trim() ?
        this.$store.commit('pushPreviousCmd', this.input) :
        null;

      if (commands[command]) {
        const result = await commands[command](...args);
        if (result !== "ok")
          this.$store.commit('setResult', result)
      }
      else {
        if (this.input.trim())
          this.$store.commit('setResult', `Unknown command '${command}', type 'help' for a list of available commands`);
      }

      this.input = '';
      this.stackState = -1;
      this.setLoading(false);
    },
    setLoading(is) {
      this.loading = is
      if (is) {
        this.loader = '|'
        this.interval = setInterval(() => {
          switch (this.loader) {
            case '|':
              this.loader = '/'
              break;
            case '/':
              this.loader = '-'
              break;
            case '-':
              this.loader = '\\'
              break;
            case '\\':
              this.loader = '|'
              break;
          }
        }, 100)
      }
      else {
        clearInterval(this.interval)
      }
    },
    inputArrowHooker(e) {
      if (e.key === 'ArrowUp') {
        if (this.stackState + 1 < this.previousCmdStack.length) {
          this.stackState++;
          this.input = this.previousCmdStack[this.stackState];
        }
      }
      else if (e.key === 'ArrowDown') {
        if (this.stackState > 0) {
          this.stackState--;
          this.input = this.previousCmdStack[this.stackState];
        }
        else if (this.stackState === 0) {
          this.stackState--;
          this.input = '';
        }
      }
    }
  },
  updated() {
    const prompt = document.getElementById('prompt');
    if (prompt) {
      prompt.focus();
      prompt.scrollIntoView();
    }
  }
};
</script>


<style scoped>
form {
  display: flex;
  gap: 11px;
  align-items: center;
}

input {
  background: black;
  color: white;
  border: none;
  outline: none;
  font-family: monospace;
  font-size: 20px;
  flex: 1;
  padding: 0;
  margin: 0;
  min-width: 100px;
  caret-color: lime;
}

.loader {
  color: gray;
}
</style>