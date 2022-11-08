<template>
  <p>
    <template v-for="command in history" :key="command">
      <ShellPromptText :path="command.path" /> {{ command.input }}
      <br v-if="command.result"/>
      <span class="command">{{ command.result }}</span>
      <br />
    </template>
  </p>
  <form @submit.prevent="runCommand" v-if="!loading">
    <p>
      <ShellPromptText :path="path"/>
    </p>
    <input id="prompt" autofocus autocomplete="off" spellcheck="false" v-model="input">
  </form>
  <p v-else><span class="loader">{{ loader }}</span></p>

</template>

<script>
import ShellPromptText from "@/components/ShellPromptText";
import commands from "@/utils/commands";
export default {
  name: "ShellContainer",
  components: { ShellPromptText },
  data() {
    return {
      loading: false,
      input: '',
      loader: '|',
    };
  },
  computed: {
    path() {
      return this.$store.state.path;
    },
    history() {
      return this.$store.state.history;
    }

  },
  methods: {
    async runCommand() {
      this.setLoading(true)

      const command = this.input.split(' ')[0].toLowerCase();
      const args = this.input.split(' ').slice(1);

      this.$store.commit('pushHistory', {path: this.path, input: this.input})

      if (commands[command]) {
        const result = await commands[command](...args);
        if (result !== "ok")
          this.$store.commit('setResult', result)
      }
      else {
        if (this.input.trim())
          this.$store.commit('setResult', 'Unknown command, type \'help\' for a list of available commands');
      }

      this.input = '';
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
}

.loader {
  color: yellow;
}
</style>