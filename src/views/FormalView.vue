<template>
  <div id="formal">
    <header>
      <div class="left">
        <router-link to="#">
          <h1>Aurélien DUMAY</h1>
        </router-link>
      </div>
      <div class="menu-right">
        <a href="#" class="anchor"><font-awesome-icon icon="fa-solid fa-address-card"/> Presentation</a>
        <a href="#" class="anchor"><font-awesome-icon icon="fa-solid fa-file-code"/> Projects</a>
        <a href="#" class="anchor"><font-awesome-icon icon="fa-solid fa-envelope"/> Contact</a>
        <div class="lang">
          <div class="lang-opt selected">fr</div>
          <div class="lang-opt">en</div>
          <div id="selector"></div>
        </div>
        <router-link to="/" class="button">“nerd” version</router-link>
      </div>
    </header>
    <main>
      <div class="presentation">
        <div class="pres-part">
            <h2>Hello, </h2>
            <p>
              My name is Aurélien I am a student in digital transformation at the
              <a class="external" href="https://www.epitech.eu/digital/" target="_blank">“Epitech digital school”</a>, looking for a <span class="green">4 to 6 month internship</span>.
            </p>
            <div class="links">
              <a href="./home/cv_fr.pdf" class="external" target="_blank">
                &#62; <font-awesome-icon icon="fa-solid fa-file"/> View my resume
              </a>
              <a href="https://www.linkedin.com/in/aureliendumay/" target="_blank" class="external">
                &#62; <font-awesome-icon icon="fa-brands fa-linkedin"/> Linkedin
              </a>
              <a href="https://www.linkedin.com/in/aureliendumay/" target="_blank" class="external">
                &#62; <font-awesome-icon icon="fa-brands fa-github"/> GitHub
              </a>
            </div>
        </div>
      </div>
    </main>
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
  white-space: normal;
}

h1, h2, h3, p {
  margin-top: 0;
  white-space: normal;
}

h1 {
  font-size: 2rem;
  margin: 0;
}

h2 {
  font-size: 2rem;
  margin-bottom: 12px;
}

p {
  font-size: 1rem;
}

header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid lime;
  padding: 24px;
  width: 100vw;
  box-sizing: border-box;
  position: fixed;
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
  padding: 9px;
  border-radius: 6px;
  font-weight: 800;
  display: inline-block;
}

a.anchor:hover {
  color: cyan;
}

.menu-right {
  display: flex;
  align-items: center;
  gap: 24px
}

main {
  position: absolute;
  min-height: calc(100vh - 88px);
  width: 100vw;
  top: 88px;
  padding: 24px;
  box-sizing: border-box;
}

.links {
  display: flex;
  align-items: center;
  gap: 24px;
  margin-top: 24px;
}

.presentation {
  display: flex;
  width: 100%;
  height: calc(100vh - 88px - 48px);
  box-sizing: border-box;
  align-items: center;
  gap: 48px;
}

.pres-part {
  width: 50%;
}

.green {
  color: lime;
}

.lang {
  display: flex;
  border-radius: 6px;
  border: 1px solid white;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 9px;
  gap: 18px;
}

#selector {
  position: absolute;
  height: 101%;
  width: 50%;
  border-radius: 5px;
  left: 0;
  background: white;
}

.lang-opt {
  z-index: 2;
}

.selected {
  color: #1e1f22;
}
</style>