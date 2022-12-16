<template>
  <div id="formal">
    <header>
      <div class="left">
        <router-link to="#">
          <h1>Aurélien DUMAY</h1>
          <p>Student in digital transformation.</p>
        </router-link>
      </div>
      <div class="right">
        <router-link class="anchor" to="#">&#62; <font-awesome-icon icon="fa-solid fa-address-card"/> Presentation</router-link>
        <router-link to="/" class="anchor">&#62; <font-awesome-icon icon="fa-solid fa-file-code"/> Projects</router-link>
        <router-link to="/" class="anchor">&#62; <font-awesome-icon icon="fa-solid fa-envelope"/> Contact</router-link>
        <router-link to="/" class="button">:p Fun version</router-link>
      </div>
    </header>
  </div>
</template>

<script>
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";

export default {
  name: "FormalView",
  components: {FontAwesomeIcon}
}
</script>

<style scoped>
#formal {
  font-family: monospace;
  min-height: 100vh;
}

h1 {
  font-size: 2rem;
  margin: 0;
}

header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid lime;
  padding: 24px;
  width: 100vw;
  box-sizing: border-box;
  position: sticky;
}

a {
  color: white;
  text-decoration: none;
}

a.external {
  text-decoration: none;
  color: cyan;
}

a.external:hover {
  text-decoration: underline;
}

a.button {
  color: #1e1f22;
  background: white;
  padding: 12px;
  border-radius: 6px;
  font-weight: 800;
}

a.anchor:hover {
  color: cyan;
}

.right {
  display: flex;
  align-items: center;
  gap: 24px
}
</style>