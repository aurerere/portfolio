<template>
  <p><span class="moving-pipe">{{ movingPipe }}</span> Loading</p>
</template>

<script>
export default {
  name: "ShellLoadingIndicator",
  data() {
    return {
      movingPipe: '|',
    };
  },
  beforeMount() {
    this.movingPipe = '|'
    this.interval = setInterval(() => {
      switch (this.movingPipe) {
        case '|':
          this.movingPipe = '/'
          break;
        case '/':
          this.movingPipe = '-'
          break;
        case '-':
          this.movingPipe = '\\'
          break;
        case '\\':
          this.movingPipe = '|'
          break;
      }
    }, 100)
  },
  unmounted() {
    clearInterval(this.interval);
  }
}
</script>

<style scoped>
p {
  font-family: monospace;
}
.moving-pipe {
  color: gray;
}
</style>