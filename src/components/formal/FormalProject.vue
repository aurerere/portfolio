<template>
    <div class="wrapper">
        <div class="info">
            <div class="project-thumbnail">
                <img :src="thumbnail" alt="project illustration">
            </div>
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
            </div>
        </div>
        <div class="access">
            <template v-for="link in links" v-bind:key="link">
                <ProjectLink :url="link.url" :text="link[lang]" :icon="link.icon ? link.icon : 'earth-americas'"/>
            </template>
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
    display: flex;
    flex-direction: column;
    overflow: hidden;
    justify-content: space-between;
}

p {
    font-size: 1rem;
}

.content {
    padding: var(--12px);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
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
}

.project-thumbnail img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    image-rendering: crisp-edges;
}

.access {
    display: flex;
    flex-wrap: wrap;
    padding: var(--12px);
    margin-bottom: var(--12px);
}
</style>