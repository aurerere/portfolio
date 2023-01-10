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
            @keydown.enter.prevent="enterHooker(false)"
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
import CLIWelcome from "@/components/cli/CLIWelcome.vue";
import CLIPromptText from "@/components/cli/CLIPromptText.vue";
import CLIResultParser from "@/components/cli/CLIResultParser.vue";
import CLILoadingIndicator from "@/components/cli/CLILoadingIndicator.vue";

// Methods
import enterHooker from "@/utils/CLIViewMethods/enterHooker";
import inputArrowHooker from "@/utils/CLIViewMethods/inputArrowHooker";
import onKeyDown from "@/utils/CLIViewMethods/onKeyDown";
import onKeyUp from "@/utils/CLIViewMethods/onKeyUp";
import pasteHooker from "@/utils/CLIViewMethods/pasteHooker";
import promptFocusCaretEnd from "@/utils/CLIViewMethods/promptFocusCaretEnd";

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
      isControlDown: false,
      isCommandDown: false,
      platform: null
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
    enterHooker,
    inputArrowHooker,
    onKeyDown,
    onKeyUp,
    pasteHooker,
    promptFocusCaretEnd
  },
  mounted()
  {
    fetch('/fileTree.json')
      .then(response => response.json())
      .then(data => {
        this.$store.commit('setFileTree', {"~": { type: "folder", children: data }});
        document.addEventListener('keydown', this.onKeyDown)
        document.addEventListener('keyup', this.onKeyUp);
        this.loading = false;
      });

      document.title = "cli - Aurélien DUMAY";
      document.querySelector('html').setAttribute("lang", 'en');
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
  white-space: pre;
}
</style>