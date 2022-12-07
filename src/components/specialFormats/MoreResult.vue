<template>
  <span v-for="line in result.split('\n')" :key="line">
    <span>{{ line }} <br></span>
  </span>
</template>

<script>
export default {
  name: "MoreResult",
  props: {
    result: {
      type: String,
      required: true
    }
  }
};
</script>

<style scoped>
a {
  color: white;
}
a:hover {
  text-decoration: none;
}
</style>