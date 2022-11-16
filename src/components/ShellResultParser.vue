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
    <CatResult
      v-else-if="result['component'] === 'cat'"
      :result="result['content']"
    />
  </template>
</template>

<script>
import LsResult from "@/components/specialFormats/LsResult.vue";
import ErrorResult from "@/components/specialFormats/ErrorResult";
import CatResult from "@/components/specialFormats/CatResult";

export default {
  name: "ShellResultParser",
  components: {LsResult, ErrorResult, CatResult},
  props: {
    result: [String, Object],
  },
  mounted() {
    console.log(this.result);
  }
};
</script>

<style scoped>

</style>