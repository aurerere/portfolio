<template>
  <span class="err-title">Error:</span> <span>{{ result }}</span><br>
</template>

<script>
export default {
  name: "ErrorResult",
  props: {
    result: {
      type: String,
      required: true
    }
  }
};
</script>

<style scoped>
span {
  color: lightcoral;
  word-wrap: break-word;
}
.err-title {
  text-decoration: underline;
}
</style>