<template>
<pre>
    ___   __  ______  _______ _____
   /   | / / / / __ \/ ____( ) ___/
  / /| |/ / / / /_/ / __/  |/\__ \
 / ___ / /_/ / _, _/ /___   ___/ /
/_/__|_\____/_/_|_/_____/  /____/
  / ____/ /   /  _/
 / /   / /    / /
/ /___/ /____/ /
\____/_____/___/v.0.1
</pre>
<p><br>If your not used to this type of interface, you can access the formal version at
  <router-link to="/formal">https://aureliendumay.me/formal</router-link>.
<br><br>
Type <span class="help" @click="help">'help'</span> for the list of available commands.<br><br></p>
</template>

<script>
import runCommand from "@/cli/runCommand";
export default {
  name: "CLIWelcome",
  methods: {
    help() {
      runCommand('help');
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