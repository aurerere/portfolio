<template>
  <span class="command" v-if="typeof result === 'string'">{{ result }}<br></span>
  <template v-else>
    <LsResult
      v-if="result['component'] === 'ls'"
      :result="result['content']"
      :path="result['path']"
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
import LsResult from "@/components/specialFormats/LsResult.vue";
import ErrorResult from "@/components/specialFormats/ErrorResult";
import MoreResult from "@/components/specialFormats/MoreResult.vue";
import EchoResult from "@/components/specialFormats/EchoResult.vue";

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