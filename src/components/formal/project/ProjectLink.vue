<template>
  <a :href="url" target="_blank">
    &#62; <font-awesome-icon :icon="icon"/> {{ text }}
  </a>
</template>

<script>
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";

export default {
  name: "ProjectLink",
  components: {FontAwesomeIcon},
  props: {
    url: String,
    icon: String,
    text: String
  }
}
</script>

<style scoped>
a {
  color: cyan;
}
a:hover {
  text-decoration: underline;
}
</style>