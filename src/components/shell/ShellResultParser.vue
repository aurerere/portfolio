<template>
  <span class="command" v-if="typeof result === 'string'">{{ result }}<br></span>
  <template v-else>
    <LsResult
      v-if="result['component'] === 'ls'"
      :result="result['content']"
      :path="result['more']['path']"
    />
    <ErrorResult
      v-else-if="result['component'] === 'error'"
      :result="result['content']"
    />
    <MoreResult
      v-else-if="result['component'] === 'more'"
      :result="result['content']"
    />
    <EchoResult
      v-else-if="result['component'] === 'echo'"
      :result="result['content']"
    />
  </template>
</template>

<script>
import LsResult from "@/components/shell/specialFormats/LsResult.vue";
import ErrorResult from "@/components/shell/specialFormats/ErrorResult.vue";
import MoreResult from "@/components/shell/specialFormats/MoreResult.vue";
import EchoResult from "@/components/shell/specialFormats/EchoResult.vue";

export default {
  name: "ShellResultParser",
  components: {EchoResult, LsResult, ErrorResult, MoreResult},
  props: {
    result: [String, Object],
  },
};
</script>

<style scoped>

</style>