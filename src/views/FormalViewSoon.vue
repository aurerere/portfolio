<template>
  <div>
    <h1>503</h1>
    <p class="err">in development</p>
    <h3>Useful links:</h3>
    <router-link to="/">&#62; My portfolio “fun” version</router-link>
    <p>-</p>
    <a href="/home/cv_fr.pdf" target="_blank">
      &#62; <font-awesome-icon icon="fa-solid fa-file"/> My resume
    </a>
    <a href="https://www.linkedin.com/in/aureliendumay/" target="_blank">
      &#62; <font-awesome-icon icon="fa-brands fa-linkedin"/>/aureliendumay
    </a>
    <a href="https://github.com/aurerere" target="_blank">
      &#62; <font-awesome-icon icon="fa-brands fa-github"/>/aurerere
    </a>
    <a href="https://github.com/aurerere" target="_blank">
      &#62; <font-awesome-icon icon="fa-solid fa-envelope"/> Mail me
    </a>
  </div>
</template>

<script>
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";

export default {
  name: "FormalViewSoon",
  components: {FontAwesomeIcon}
}
</script>

<style scoped>
div {
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
  font-family: monospace;
  color: white;
  padding: 20px;
  font-size: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

h1 {
  font-size: 100px;
  margin: 0;
  color: lime;
}

.err {
  margin-bottom: 40px;
}

a {
  color: cyan;
  padding: 12px;
  text-decoration: none;
}

a:hover {
  background: cyan;
  color: black;
  border-radius: 6px;
}
</style>