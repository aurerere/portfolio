<template>
  <span class="command" v-if="typeof result === 'string'">{{ result }}</span>
  <template v-else>
    <LsResult v-if="result['component'] === 'ls'" :result="result['content']"/>
  </template>
</template>

<script>
import LsResult from "@/components/specialFormats/LsResult.vue";

export default {
  name: "ShellResultParser",
  components: {LsResult},
  props: {
    result: [String, Object],
  }
};
</script>

<style scoped>

</style>