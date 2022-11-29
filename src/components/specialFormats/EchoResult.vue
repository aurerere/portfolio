<template>
  <span v-for="line in result.split('\n')" v-bind:key="line">{{line}}<br></span>
</template>

<script>
export default {
  name: "EchoResult",
  props: {
    result: String
  }
}
</script>

<style scoped>

</style>