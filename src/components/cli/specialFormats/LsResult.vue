<template>
  <br>
  <span class="grey">Directory: </span>
  <template v-for="dir in path" :key="dir">
    <span class="cyan">{{ dir }}</span>
    <span class="separator">/</span>
  </template>
  <br>
  <br>
  <span class="grey bold">NAME {{ " ".repeat(getLongestName() - 4) }} TYPE</span><br>
  <template v-for="(key, name) in result" v-bind:key="key">
    <span>
      <span :class="'filename ' + (typeof key === 'object' ? 'directory' : key)">{{ name }} </span>
    </span>
    <span class="grey">{{" " + "-".repeat(getLongestName() - name.length)}} </span>
    <span class="grey">&nbsp;{{ typeof key === 'string' ? (typesDict[key] ? typesDict[key] : key) : 'dir' }}</span><br>
  </template>
  <br>
</template>

<script>
export default {
  name: "LsResult",
  data: () => ({
    typesDict: {
      any: 'file',
      executable: 'file(executable)',
      img: 'file(media)',
      doc: 'file(document)'
    },
    longestName: 0
  }),
  props: {
    result: {
      type: Object,
      required: true
    },
    path: {
      type: Array,
      required: true
    },
  },
  methods: {
    getLongestName() {
      let longest = 0;
      for (let name in this.result) {
        if (name.length > longest) {
          longest = name.length;
        }
      }
      return longest;
    }
  },
  beforeMount() {
    this.longestName = this.getLongestName();
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
  white-space: pre;
  width: 50%;
  max-width: 500px;
}
.cyan {
  color: #00ffff;
}
.grey {
  color: darkgray;
  white-space: pre;
}
.darkgrey {
  color: #4a4a4a;
  white-space: pre;
}
.directory {
  color: cyan;
  font-weight: bold;
}

.doc {
  color: orange;
}

.executable {
  color: lime;
  font-weight: bold;
}
.file {
  color: white;
}
.img{
  color: magenta;
}
.bold {
  font-weight: bold;
}
</style>