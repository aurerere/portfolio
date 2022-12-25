<template>
  <div class="loading" v-if="loading">
    <ShellLoadingIndicator/>
  </div>
  <div id="formal" v-else @click="mayCloseMenu">
    <header ref="header">
      <div class="max">
        <div class="left">
          <a class="anchor" @click="scrollTo('presentation')">
            <h1>Aurélien DUMAY</h1>
          </a>
        </div>
        <div class="burger pointer" @click="open" ref="menuOpener">
          <font-awesome-icon icon="bars"/>
        </div>
        <div class="menu-right" ref="menu">
          <div class="title-close">
            <p>Menu</p>
            <font-awesome-icon icon="xmark" @click="close" class="close"/>
          </div>
          <a class="anchor active" @click="scrollTo('presentation')" ref="to-presentation">
            <font-awesome-icon icon="address-card"/>
            {{ content.menu['presentation'][selectedLang] }}
          </a>
          <a class="anchor" @click="scrollTo('projects')" ref="to-projects">
            <font-awesome-icon icon="file-code"/>
            {{ content.menu['projects'][selectedLang] }}
          </a>
          <a class="anchor" @click="scrollTo('contact')" ref="to-contact">
            <font-awesome-icon icon="envelope"/>
            {{ content.menu['contact'][selectedLang] }}
          </a>
          <div class="lang" @click="selectedLang === 'fr' ? changeLang('en') : changeLang('fr')">
            <div :class="selectedLang === 'fr' ? 'lang-opt selected' : 'lang-opt'">fr</div>
            <div :class="selectedLang === 'en' ? 'lang-opt selected' : 'lang-opt'">en</div>
            <div id="selector" :class="selectedLang"></div>
          </div>
          <router-link to="/" class="button">
            <font-awesome-icon icon="terminal"/> {{ content.menu['nerd'][selectedLang] }}
          </router-link>
        </div>
      </div>
    </header>
    <main>
      <div class="max-main">
        <div class="presentation" ref="presentation">
          <div class="pres-wrapper">

            <div class="pres-part image-wrapper">
              <div class="pres-part image"></div>
            </div>
            <div class="pres-part">
              <h2>{{ content['presentation'].title[selectedLang] }}</h2>
              <p v-html="content['presentation']['txt'][selectedLang]"></p>
              <div class="links">
                <a href="/home/cv_fr.pdf" class="external" target="_blank">
                  &#62; <font-awesome-icon icon="file"/>
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
        <div class="part" ref="projects">
          <h2>Projects</h2>
          <div class="project-grid">
            <template v-for="project in content.projects" v-bind:key="project.name">
              <FormalProject
                  :name="project.name"
                  :desc="project.desc[selectedLang]"
                  :thumbnail="project.image"
                  :tags="project.tags"
                  :lang="selectedLang"
                  :done="project.done"
                  :links="project.links"
              />
            </template>
          </div>
        </div>
        <div class="part" ref="contact">
          <h2>Contact</h2>
        </div>
      </div>
    </main>
    <footer>
      <div>
        <p><b>{{ content.footer['love'][selectedLang] }}</b></p>
        <p>{{ content.footer['cookies'][selectedLang] }}</p>
        <a class="external" href="https://github.com/aurerere/portfolio" target="_blank">
          <font-awesome-icon icon="fa-brands fa-github"/>/aurerere/portfolio
        </a>
      </div>
    </footer>
  </div>
</template>

<script>
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import ShellLoadingIndicator from "@/components/cli/ShellLoadingIndicator.vue";
import FormalProject from "@/components/formal/FormalProject.vue";

export default {
  name: "FormalView",
  components: {FormalProject, ShellLoadingIndicator, FontAwesomeIcon},
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
    open() {
      this.$refs.menu.classList.add('opened');
      this.$refs.menuOpener.classList.add('opened');
    },
    close() {
      this.$refs.menu.classList.remove('opened');
      this.$refs.menuOpener.classList.remove('opened');
    },
    mayCloseMenu(e){
      if (e.target.classList.contains('button'))
        return;

      const menu = this.$refs.menu;

      if ((!menu.contains(e.target) && menu !== e.target) && !this.$refs.menuOpener.contains(e.target)) {
        this.close();
      }
      else {
        if (e.target.classList.contains('anchor')) {
          this.close();
        }
      }

    },
    scrollTo(ref) {
      let y = ref === 'presentation' ? 0 : this.$refs[ref].offsetTop - this.$refs.header.offsetHeight;
      window.scrollTo(0, y)
    },
    scrollHook() {
      let pos = window.pageYOffset;
      let current = document.querySelector('.active');

      if (pos > this.$refs['contact'].offsetTop - (3 * this.$refs.header.offsetHeight)) {
        if (current !== this.$refs['to-contact']) {
          current.classList.remove('active');
          this.$refs['to-contact'].classList.add('active');
        }
      }
      else if (pos > this.$refs['projects'].offsetTop - (3 * this.$refs.header.offsetHeight)) {
        if (current !== this.$refs['to-projects']) {
          current.classList.remove('active');
          this.$refs['to-projects'].classList.add('active');
        }
      }
      else {
        if (current !== this.$refs['to-presentation']) {
          current.classList.remove('active');
          this.$refs['to-presentation'].classList.add('active');
        }
      }
    }
  },
  mounted() {
    fetch('./formal.json')
        .then(r => r.json())
        .then(r => {
          this.content = r;
          this.loading = false;
        });
  },
  updated() {
    document.removeEventListener('scroll', this.scrollHook);
    document.addEventListener('scroll', this.scrollHook);
  },
  beforeUnmount() {
    document.removeEventListener('scroll', this.scrollHook);
  }
}
</script>

<style scoped>
@import "@/assets/formal.css";
</style>