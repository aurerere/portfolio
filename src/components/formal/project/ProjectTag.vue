<template>
  <span><font-awesome-icon :icon="getIcon(name)"/> {{ name }}</span>
</template>

<script>
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";

export default {
  name: "ProjectTag",
  components: {FontAwesomeIcon},
  props: {
    name: {
      required: true,
      type: String
    }
  },
  methods: {
    getIcon(name) {
      switch (name) {
        case "VueJS":
          return "fa-brands fa-vuejs"
        case "ExpressJS":
          return "fa-brands fa-node-js"
        case "Figma":
          return "fa-brands fa-figma"
        default:
          return "list-ul"
      }
    }
  }
}
</script>

<style scoped>
span {
  padding: 4px;
  background: #3f4148;
  border-radius: 4px;
  margin: 6px 6px 0 0;
  word-break: keep-all;
}
</style>