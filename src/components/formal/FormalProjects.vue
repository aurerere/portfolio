<template>
  <div class="wrapper">
    <div class="project-thumbnail" :style="'background-image: url(' + thumbnail + ')'"></div>
    <div class="content">
      <h3>{{ name }}</h3>
      <p>{{ desc }}</p>

      <div class="tags">
        <template v-for="tag in tags" v-bind:key="tag">
          <ProjectTag :name="tag"/>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import ProjectTag from "@/components/formal/project/ProjectTag.vue";

export default {
  name: "FormalProjects",
  components: {ProjectTag},
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

  }
}
</script>

<style scoped>
@import "@/assets/formal.css";
.wrapper {
  width: 100%;
  height: 600px;
  box-sizing: border-box;
  border: 1px solid lime;
  border-radius: 12px;
}
p {
  font-size: 1rem;
}
.content {
  padding: var(--12px);
}

.project-thumbnail {
  width: 100%;
  height: 50%;
  background-size: cover;
  background-repeat: no-repeat;
  background-position-x: center;
  border-radius: 12px 12px 0 0;
}

.tags {
  margin-top: var(--24px);
}
</style>