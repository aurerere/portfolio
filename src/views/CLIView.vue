<template>
  <div id="terminal">
    <CLIWelcome v-if="!cleared"/>
    <p>
      <template v-for="command in history" :key="command">
        <template v-if="command.path">
          <CLIPromptText :path="command.path"/>{{ command.path ? command.input : null }}
          <br v-if="command.result"/>
        </template>
        <template v-for="part in command.result" v-bind:key="part">
          <CLIResultParser v-if="part" :result="part"/>
        </template>
        <br v-if="!command.result"/>
      </template>
    </p>
    <div class="prompt-wrapper" v-if="!loading" @click="$refs.prompt.focus()">
      <p>
        <CLIPromptText :path="path"/>
        <span
            @keydown.enter.prevent="runCommand(false)"
            @keydown.up.down.prevent="inputArrowHooker"
            @keydown.tab.prevent
            @paste="pasteHooker"
            contenteditable="true"
            spellcheck="false"
            ref="prompt"
            class="prompt"
        >
      </span>
      </p>
    </div>
    <CLILoadingIndicator v-else/>
  </div>

</template>

<script>
import runCommand from "@/utils/cli/runCommand";
import CLIWelcome from "@/components/cli/CLIWelcome.vue";
import CLIPromptText from "@/components/cli/CLIPromptText.vue";
import CLIResultParser from "@/components/cli/CLIResultParser.vue";
import CLILoadingIndicator from "@/components/cli/CLILoadingIndicator.vue";
import cls from "@/utils/cli/commands/cls";

export default {
  name: "CLIView",
  components: {
    CLILoadingIndicator,
    CLIResultParser,
    CLIPromptText,
    CLIWelcome
  },
  data()
  {
    return {
      loading: true,
      input: '',
      stackState: -1,
      isShiftDown: false,
      isControlDown: false
    };
  },
  computed: {
    path()
    {
      return this.$store.state.path;
    },
    history()
    {
      return this.$store.state.history;
    },
    previousCmdStack()
    {
      return this.$store.state.previousCmdStack;
    },
    cleared()
    {
      return this.$store.state.cleared;
    },
  },
  methods: {
    async runCommand(auto)
    {
      if (auto === false)
        this.input = this.$refs.prompt.innerText;

      this.loading = true;
      await runCommand(this.input);
      this.input = '';
      this.stackState = -1;
      this.loading = false;
    },
    inputArrowHooker(e)
    {
      if (e.key === 'ArrowUp') {
        if (this.stackState + 1 < this.previousCmdStack.length) {
          this.stackState++;
          this.$refs.prompt.innerText = this.previousCmdStack[this.stackState];
          this.promptFocusCaretEnd();
        }
      }
      else if (e.key === 'ArrowDown') {
        if (this.stackState > 0) {
          this.stackState--;
          this.$refs.prompt.innerText = this.previousCmdStack[this.stackState];
          this.promptFocusCaretEnd();
        }
        else if (this.stackState === 0) {
          this.stackState--;
          this.$refs.prompt.innerText = '';
        }
      }
    },
    onKeyDown(e)
    {
      if (e.key === 'l') {
        if (this.isControlDown && !this.isShiftDown) {
          e.preventDefault();
          cls();
        }
      }

      if (e.key === 'Control') { // Need to modify that for macOS support
        this.isControlDown = true;
        return;
      }

      window.scrollTo(0, document.body.scrollHeight);
      if (document.activeElement !== this.$refs.prompt) {
        if (e.key === 'Shift') {
          this.isShiftDown = true;
          return;
        }

        if (e.key.startsWith('Arrow'))
          if (this.isShiftDown)
            return;

        if (!this.loading && !(this.isControlDown && e.key === 'c')) {
          this.promptFocusCaretEnd();
          window.scrollTo(0, document.body.scrollHeight);
        }
      }
    },
    onKeyUp(e)
    {
      if (e.key === 'Shift')
        this.isShiftDown = false;

      if (e.key === 'Control')
        this.isControlDown = false;
    },
    // tabHooker(e) {
    //   console.log(e)
    // }
    async pasteHooker(e)
    {
      const data = e.clipboardData.getData('Text').replaceAll('\r', '');

      if (data.includes('\n')) {
        const inputs = data.split('\n');

        for (let i = 0; i < inputs.length - 1; i++) {
          this.input = inputs[i]
          await this.runCommand(true)
        }

        this.$refs.prompt.innerText = inputs[inputs.length - 1];
      }
      else {
        this.$refs.prompt.innerText += data;
      }

      e.preventDefault();
      this.promptFocusCaretEnd();
    },
    promptFocusCaretEnd() {
      const target = this.$refs.prompt;

      //https://stackoverflow.com/questions/1125292/how-to-move-cursor-to-end-of-contenteditable-entity
      const range = document.createRange();
      const sel = window.getSelection();
      range.selectNodeContents(target);
      range.collapse(false);
      sel.removeAllRanges();
      sel.addRange(range);
      target.focus();
      range.detach(); // optimization

      // set scroll to the end if multiline
      target.scrollTop = target.scrollHeight;
    }
  },
  mounted()
  {
    fetch('/fileTree.json')
        .then(response => response.json())
        .then(data => {
          this.$store.commit('setFileTree', {"~": { type: "folder", children: data }});
          this.loading = false;
        });

    document.querySelector('html').setAttribute("lang", 'en');
    document.title = "CLI - Aurélien DUMAY";

    document.addEventListener('keydown', this.onKeyDown)
    document.addEventListener('keyup', this.onKeyUp);
  },
  updated()
  {
    const prompt = this.$refs.prompt;

    if (prompt)
      prompt.focus();

    window.scrollTo(0, document.body.scrollHeight);
  },
  beforeUnmount()
  {
    document.removeEventListener('keydown', this.onKeyDown)
    document.removeEventListener('keyup', this.onKeyUp);
  }
};
</script>


<style scoped>
#terminal {
  font-family: monospace;
  color: white;
  padding: 20px 20px 0 20px;
  font-size: 20px;
  min-height: 100vh;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}

.loader {
  color: gray;
}

p, a, span {
  word-break: break-all;
}

@media (max-width: 420px) {
  #terminal {
    font-size: 12px;
  }
}

.prompt {
  caret-color: lime;
}

.prompt-wrapper {
  flex: 1;
  padding-bottom: 20px;
}

[contenteditable] {
  outline: none;
}
</style>