<template>
  <ShellContainer/>
</template>

<script>
import ShellContainer from "@/components/ShellContainer";

export default {
  name: 'App',
  components: {
    ShellContainer
  }
}
</script>

<style>
html {
  color-scheme: dark;
}

body {
  margin: 0;
  padding: 0;
  background: #1e1f22;
}
#app {
  font-family: monospace;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: white;
  padding: 20px;
  font-size: 20px;
}
p {
  margin: 0;
  word-wrap: break-word;
}

::-moz-selection {
  color: black;
  background: white;
}

::selection {
  color: black;
  background: white;
}
</style>
