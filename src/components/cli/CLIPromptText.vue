<template>
  <span class="prompt" contenteditable="false">
    <span class="user">aureliendumay.me</span>
    <span class="separator">:</span>
    <template v-for="dir in path" :key="dir">
      <span class="directory">{{ dir }}</span>
      <span class="separator">/</span>
    </template>
    <span class="separator">$&nbsp;</span>
  </span>
</template>

<script>
export default {
  name: "CLIPromptText",
  props: {
    path: {
      required: true
    }
  },
};
</script>

<style scoped>
.user {
  color: lime;
}
.separator {
  color: white;
}
.directory {
  color: cyan;
}
</style>