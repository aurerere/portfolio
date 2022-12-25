<template>
  <div class="wrapper">
    <div class="project-thumbnail" :style="'background-image: url(' + thumbnail + ')'"></div>
    <div class="content">
      <div class="title">
        <h3>{{ name }}</h3>
        <ProjectStatus :done="done" :lang="lang"/>
      </div>
      <p>{{ desc }}</p>

      <div class="tags">
        <template v-for="tag in tags" v-bind:key="tag">
          <ProjectTag :name="tag"/>
        </template>
      </div>

      <div class="access">
        <template v-for="link in links" v-bind:key="link">
          <ProjectLink :link="link"/>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import ProjectTag from "@/components/formal/project/ProjectTag.vue";
import ProjectStatus from "@/components/formal/project/ProjectStatus.vue";
import ProjectLink from "@/components/formal/project/ProjectLink.vue";

export default {
  name: "FormalProject",
  components: {ProjectLink, ProjectStatus, ProjectTag},
  props: {
    thumbnail: {
      required: true,
      type: String
    },
    name: {
      required: true,
      type: String
    },
    desc: {
      required: true,
      type: String
    },
    tags: {
      required: true,
      type: Array
    },
    done: {
      required: true,
      type: Boolean
    },
    lang: {
      required: true,
      type: String
    },
    links: {
      required: true,
      type: Array
    }
  }
}
</script>

<style scoped>
@import "@/assets/formal.css";
.wrapper {
  width: 100%;
  box-sizing: border-box;
  border: 1px solid lime;
  border-radius: 12px;
}
p {
  font-size: 1rem;
}
.content {
  display: flex;
  flex-direction: column;
  padding: var(--12px);
  gap: var(--12px);
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.project-thumbnail {
  width: 100%;
  height: 250px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position-x: center;
  border-radius: 12px 12px 0 0;
}
</style>