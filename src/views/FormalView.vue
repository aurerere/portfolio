<template>
  <div class="loading" v-if="loading">
    <ShellLoadingIndicator/>
  </div>
  <div id="formal" v-else>
    <header>
      <div class="left">
        <router-link class="anchor" to="#">
          <h1>Aurélien DUMAY</h1>
        </router-link>
      </div>
      <div class="burger">
        <font-awesome-icon icon="bars"/>
      </div>
      <div class="menu-right">
        <router-link to="#presentation" class="anchor">
          <font-awesome-icon icon="address-card"/>
          {{ content.menu['presentation'][selectedLang] }}
        </router-link>
        <router-link to="#" class="anchor">
          <font-awesome-icon icon="file-code"/>
          {{ content.menu['projects'][selectedLang] }}
        </router-link>
        <router-link to="#" class="anchor">
          <font-awesome-icon icon="envelope"/>
          {{ content.menu['contact'][selectedLang] }}
        </router-link>
        <div class="lang" @click="selectedLang === 'fr' ? changeLang('en') : changeLang('fr')">
          <div :class="selectedLang === 'fr' ? 'lang-opt selected' : 'lang-opt'">fr</div>
          <div :class="selectedLang === 'en' ? 'lang-opt selected' : 'lang-opt'">en</div>
          <div id="selector" :class="selectedLang"></div>
        </div>
        <router-link to="/" class="button">{{ content.menu['nerd'][selectedLang] }}</router-link>
      </div>
    </header>
    <main>
      <div class="presentation" id="presentation">
        <div class="pres-wrapper">

          <div class="pres-part image-wrapper">
            <div class="pres-part image"></div>
          </div>
          <div class="pres-part">
            <h2>{{ content['presentation'].title[selectedLang] }}</h2>
            <p v-html="content['presentation']['txt'][selectedLang]"></p>
            <div class="links">
              <a href="./home/cv_fr.pdf" class="external" target="_blank">
                &#62; <font-awesome-icon icon="fa-solid fa-file"/>
                {{ content['presentation']['btn'][selectedLang] }}
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
        <div class="sfm">
          <p class="gray"> ↓ Scroll ↓ </p>
        </div>
      </div>
      <div class="projects">
        <h2>Projects</h2>
      </div>
    </main>
  </div>
</template>

<script>
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import ShellLoadingIndicator from "@/components/shell/ShellLoadingIndicator.vue";

export default {
  name: "FormalView",
  components: {ShellLoadingIndicator, FontAwesomeIcon},
  data() {
    return {
      selectedLang: 'fr',
      content: null,
      loading: true,
    };
  },
  methods: {
    changeLang(to) {
      this.selectedLang = to;
    },
  },
  mounted() {
    fetch('./formal.json')
        .then(r => r.json())
        .then(r => {
          this.content = r;
          this.loading = false;
        });
  }
}
</script>

<style scoped>
#formal {
  font-family: monospace;
  min-height: 100vh;
  white-space: normal;
  font-size: 1rem;
}

.loading {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
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
  font-size: 3rem;
  margin-bottom: 12px;
}

p {
  font-size: 1.2rem;
}

header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid lime;
  padding: 24px 48px;
  width: 100vw;
  box-sizing: border-box;
  position: fixed;
  z-index: 1;
}

a {
  white-space: nowrap;
  text-decoration: none;
}

a.anchor {
  color: white;
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
  width: 100%;
  top: 88px;
  padding: 24px 48px;
  box-sizing: border-box;
  z-index: 0;
}

.links {
  display: flex;
  align-items: center;
  gap: 24px;
  margin-top: 24px;
}

.presentation {
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: calc(100vh - 88px - 48px);
  box-sizing: border-box;
  gap: 48px;
  justify-content: space-between;
  position: relative;
  margin-bottom: 24px;
}

.pres-wrapper {
  display: flex;
  gap: 48px;
  justify-content: space-between;
  height: 100%;
  position: absolute;
  align-items: center;
}

.pres-part {
  width: 50%;
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
  cursor: pointer;
}

.lang-opt {
  transition: .3s;
}

#selector {
  position: absolute;
  height: 100%;
  width: 50%;
  border-radius: 5px;
  background: white;
  transition: 0.3s;
}

.lang-opt {
  z-index: 2;
}

.selected {
  color: #1e1f22;
}
.fr {
  left: 0;
}
.en {
  left: 50%;
}

.gray {
  color: gray;
  font-weight: bold;
}

.sfm {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  bottom: 0;
  position: absolute;
  width: 100%;
  animation: sdm 1.5s ease-in-out infinite;
}

.image {
  display: flex;
  justify-content: center;
  border-radius: 0 200px;
  width: 100%;
  height: 100%;
  background-image: url("@/assets/hello.png");
  background-repeat: no-repeat;
  background-size: contain;
  background-position-x: center;
  position: absolute;
}

.image-wrapper {
  display: flex;
  justify-content: center;
  border-radius: 0 200px;
  height: 50%;
  background-image: linear-gradient(90deg, rgba(0, 255, 255, 0.2), rgba(0, 255, 0, .2));
  background-repeat: no-repeat;
  background-size: contain;
  position: relative;
}

@keyframes sdm {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
  100% {
    transform: translateY(0);
  }
}

.burger {
  display: none;
}

@media (max-width: 1020px) {
  .menu-right {
    display: none;
  }
  .burger {
    display: block;
  }
  .pres-wrapper {
    flex-direction: column;
    justify-content: center;
  }
  main {
    padding: 20px;
  }
  header {
    padding: 20px;
  }
  .links {
    flex-wrap: wrap;
  }
  .image-wrapper {
    height: 30%;
    border-radius: 0 80px;
  }
  h1, h2 {
    font-size: 2rem;
  }
  p, a {
    font-size: 1rem;
  }
  .pres-part {
    width: 100%;
  }
}
</style>