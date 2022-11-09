<template>
  <span class="command" v-if="typeof result === 'string'">{{ result }}</span>
</template>

<script>
export default {
  name: "ShellResultParser",
  props: {
    result: {
      type: String || Object,
      required: true
    }
  },
};
</script>

<style scoped>

</style>