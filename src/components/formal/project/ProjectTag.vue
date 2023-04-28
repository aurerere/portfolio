<template>
    <div>
        <font-awesome-icon :icon="getIcon(name)"/>
        <span>{{ name }}</span>
    </div>
</template>

<script>
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";

export default {
    name: "ProjectTag",
    components: {FontAwesomeIcon},
    props: {
        name: {
            required: true,
            type: String
        }
    },
    methods: {
        getIcon(name) {
            switch (name) {
                case "VueJS":
                    return "fa-brands fa-vuejs"
                case "ExpressJS":
                    return "fa-brands fa-node-js"
                case "Figma":
                    return "fa-brands fa-figma"
                case "TypeScript":
                    return "file"
                case "MySQL":
                    return "database"
                case "Design":
                    return "pen-nib"
                case "Adobe Illustrator":
                    return "bezier-curve"
                default:
                    return "tag"
            }
        }
    }
}
</script>

<style scoped>
div {
    padding: 4px;
    background: #3f4148;
    border-radius: 4px;
    word-break: keep-all;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    gap: 6px;
}

span {
    white-space: nowrap;
}
</style>