<template>
<pre>
    ___   __  ______  _______ _____
   /   | / / / / __ \/ ____( ) ___/
  / /| |/ / / / /_/ / __/  |/\__ \
 / ___ / /_/ / _, _/ /___   ___/ /
/_/__|_\____/_/_|_/_____/  /____/
  / ___// / / / ____/ /   / /
  \__ \/ /_/ / __/ / /   / /
 ___/ / __  / /___/ /___/ /___
/____/_/ /_/_____/_____/_____/v.0.1
</pre><br>
<p>You can access the formal version <a href="">here</a>.</p><br>
<p>Type <span class="help" @click="help">'help'</span> for the list of available commands.</p><br>
</template>

<script>
import parse from "@/utils/commands/compute/parse";
export default {
  name: "ShellWelcome",
  methods: {
    help() {
      parse('help');
    }
  }
}
</script>

<style scoped>
pre {
  overflow-x: hidden;
  margin: 0;
  color: lime;
}

.help {
  color: cyan;
  cursor: pointer;
}

.help:hover {
  text-decoration: underline;
}

a {
  color: cyan;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}
</style>