<template>
  <div class="loading" v-if="loading">
    <CLILoadingIndicator/>
  </div>
  <div id="formal" v-else @click="mayCloseMenu">
    <header ref="header">
      <div class="max">
        <div class="left">
          <a class="anchor" @click="scrollToSection('presentation')">
            <h1>Aurélien DUMAY</h1>
          </a>
        </div>
        <div class="burger pointer" @click="openMenu" ref="menuOpener">
          <font-awesome-icon icon="bars"/>
        </div>
        <div class="menu-right" ref="menu">
          <div class="title-close">
            <p>Menu</p>
            <font-awesome-icon icon="xmark" @click="closeMenu" class="close"/>
          </div>
          <a class="anchor active" @click="scrollToSection('presentation')" ref="to-presentation">
            <font-awesome-icon icon="address-card"/>
            {{ content.menu['presentation'][selectedLang] }}
          </a>
          <a class="anchor" @click="scrollToSection('projects')" ref="to-projects">
            <font-awesome-icon icon="file-code"/>
            {{ content.menu['projects'][selectedLang] }}
          </a>
          <a class="anchor" @click="scrollToSection('contact')" ref="to-contact">
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
                <a href="https://github.com/aurerere/" target="_blank" class="external">
                  &#62; <font-awesome-icon icon="fa-brands fa-github"/> GitHub
                </a>
              </div>
            </div>
          </div>
        </div>
        <div class="sfm" ref="sfm">
          <p class="gray"> ↓ Scroll ↓ </p>
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
          <div class="contact">
            <div class="method">
              <h3>{{ content['contact']['linkedin'][selectedLang] }}</h3>
              <a href="https://linkedin.com/in/aureliendumay" class="external" target="_blank">
                <p><font-awesome-icon icon="fa-brands fa-linkedin"/>/aureliendumay</p>
              </a>
            </div>
            <div class="method">
              <h3>{{ content['contact']['phone'][selectedLang] }}</h3>
              <a href="tel:0674778743" class="external">
                <p class="space-after-icon"><font-awesome-icon icon="phone"/> 06 74 77 87 43</p>
              </a>
            </div>
            <div class="method">
              <h3>{{ content['contact']['mail'][selectedLang] }}</h3>
              <a href="mailto:aure.dumay@gmail.com" class="external">
                <p class="space-after-icon"><font-awesome-icon icon="envelope"/> aure.dumay@gmail.com</p>
              </a>
            </div>
          </div>
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
import FormalProject from "@/components/formal/FormalProject.vue";
import CLILoadingIndicator from "@/components/cli/CLILoadingIndicator.vue";

// Methods
import changeLang from "@/utils/FormalViewMethods/changeLang";
import openMenu from "@/utils/FormalViewMethods/openMenu";
import closeMenu from "@/utils/FormalViewMethods/closeMenu";
import mayCloseMenu from "@/utils/FormalViewMethods/mayCloseMenu";
import scrollToSection from "@/utils/FormalViewMethods/scrollToSection";
import scrollHook from "@/utils/FormalViewMethods/scrollHook";

export default {
  name: "FormalView",
  components: {CLILoadingIndicator, FormalProject, FontAwesomeIcon},
  data() {
    return {
      selectedLang: '',
      content: null,
      loading: true,
    };
  },
  methods: {
    changeLang,
    openMenu,
    closeMenu,
    mayCloseMenu,
    scrollToSection,
    scrollHook
  },
  mounted() {
    fetch('./formalData.json')
      .then(r => r.json())
      .then(r => {
        this.content = r;
        this.loading = false;
      });

    document.title = "Formal - Aurélien DUMAY";

    if (navigator.language.startsWith('fr-')) {
      document.querySelector('html').setAttribute("lang", 'fr');
      this.selectedLang = 'fr';
    }
    else {
      document.querySelector('html').setAttribute("lang", 'en');
      this.selectedLang = 'en';
    }
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