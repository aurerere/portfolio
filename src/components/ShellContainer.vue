<template>
  <ShellWelcome v-if="!cleared"/>
  <p>
    <template v-for="command in history" :key="command">
      <ShellPromptText :path="command.path" /> {{ command.input }}
      <br v-if="command.result"/>
      <ShellResultParser v-if="command.result" :result="command.result"/>
      <br v-if="!command.result"/>
    </template>
  </p>
  <form @submit.prevent="runCommand" v-if="!loading">
    <p>
      <ShellPromptText :path="path"/>
    </p>
    <input
      id="prompt"
      autofocus
      @keydown.up.down.prevent="inputArrowHooker"
      autocomplete="off"
      spellcheck="false"
      v-model="input">
  </form>
  <p v-else><span class="loader">{{ loader }}</span> Loading</p>

</template>

<script>
import ShellPromptText from "@/components/ShellPromptText";
import runCommand from "@/utils/commands";
import ShellResultParser from "@/components/ShellResultParser";
import ShellWelcome from "@/components/ShellWelcome";

export default {
  name: "ShellContainer",
  components: {ShellWelcome, ShellResultParser, ShellPromptText },
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
    cleared() {
      return this.$store.state.cleared;
    },
  },
  methods: {
    async runCommand() {
      this.setLoading(true)
      await runCommand(this.input);
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
    },
  },
  updated() {
    const prompt = document.getElementById('prompt');
    if (prompt) {
      prompt.focus();
      prompt.scrollIntoView();
    }
  },
};
</script>


<style scoped>
form {
  display: flex;
  gap: 11px;
  align-items: center;
}

input {
  background: transparent;
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