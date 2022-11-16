<template>
  <br>
  <span class="grey">Directory: </span>
  <template v-for="dir in path" :key="dir">
    <span class="directory">{{ dir }}</span>
    <span class="separator">/</span>
  </template>
  <br><br>
  <span class="flex">
    <span class="grey">| NAME {{ " ".repeat(winWidth - 4) }} | TYPE</span>
  </span>
  <span class="grey">{{ "~".repeat(winWidth + 11) }}</span><br>
  <template v-for="(key, name) in result" v-bind:key="key">
    <span>
      <span class="grey">| </span>
      <span :class="'filename ' + key['type']">{{ name }}</span>
      <span class="grey">{{ " " + "-".repeat(winWidth - name.length) + " "}}</span>
    </span>
    <span class="grey">| </span>
    <span>{{ typesDict[key['type']] }}</span><br>
  </template>
  <br>
</template>

<script>
export default {
  name: "LsResult",
  data() {
    return {
      winWidth: window.innerWidth / 30
    }
  },
  props: {
    result: {
      type: Object,
      required: true
    },
    path: {
      type: Array,
      required: true
    },
    typesDict: {
      default: () => ({
        'file': 'FILE',
        'folder': 'DIR',
        'app': 'APP'
      })
    }
  },
  methods: {
    handleResize() {
      this.winWidth = window.innerWidth / 30;
    }
  },
  mounted() {
    window.addEventListener('resize', this.handleResize);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }
}
</script>

<style scoped>
.flex {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.filename {
  color: cyan;
  white-space: pre;
  width: 50%;
  max-width: 500px;
}
.grey {
  color: darkgray;
  white-space: pre;
}
.directory {
  color: cyan;
}
.app {
  color: lime;
}
.file {
  color: white;
}
</style>