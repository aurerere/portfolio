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
<p>
  <br>
  <template v-if="$parent.$data.deviceInfo && $parent.$data.deviceInfo.device === 'mobile'">
    <span class="red" >
      Warning: This interface is not optimized for touch devices,
      it is recommended to visit the formal version (available at <router-link to="/formal">https://aureliendumay.me/formal</router-link>).
    </span>
  </template>
  <template v-else>
    If your not used to this type of interface, you can access the formal version at
    <router-link to="/formal">https://aureliendumay.me/formal</router-link>.
  </template>
  <br><br>
  Type <span class="help" @click="help">'help'</span> for the list of available commands.
  <br><br>
</p>
</template>

<script>
import runCommand from "@/cli/runCommand";
export default {
  name: "CLIWelcome",
  methods: {
    help() {
      runCommand('help');
    }
  },
  mounted() {
    console.log(this.$parent.$data.deviceInfo);
  },
  updated() {
    console.log(this.$parent.$data.deviceInfo);
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
  word-break: break-all;
}

a:hover {
  text-decoration: underline;
}

p {
  word-break: break-all;
}

.red {
  color: lightcoral;
  word-break: normal;
}
</style>