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
import LsResult from "@/components/cli/specialFormats/LsResult.vue";
import ErrorResult from "@/components/cli/specialFormats/ErrorResult.vue";
import MoreResult from "@/components/cli/specialFormats/MoreResult.vue";
import EchoResult from "@/components/cli/specialFormats/EchoResult.vue";

export default {
  name: "CLIResultParser",
  components: {EchoResult, LsResult, ErrorResult, MoreResult},
  props: {
    result: [String, Object],
  },
};
</script>

<style scoped>

</style>