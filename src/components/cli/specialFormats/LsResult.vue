<template>
    <span class="flex">
        <template v-for="(key, name) in result" v-bind:key="key">
            <span :class="'filename ' + (typeof key === 'object' ? 'directory' : key)">
                {{name}}
            </span>
        </template>
    </span>
</template>

<script>
export default {
    name: "LsResult",
    data() {
        return {
            winWidth: window.innerWidth > 420 ? window.innerWidth / 30 : window.innerWidth / 15,
        }
    },
    props: {
        result: {
            type: Object,
            required: true
        },
        path: {
            type: Array,
            required: true
        },
        typesDict: {
            default: () => ({
                'any': 'file',
                'executable': 'executable',
                'img': 'media'
            })
        }
    },
    methods: {
        handleResize() {
            this.winWidth = window.innerWidth > 420 ? window.innerWidth / 30 : window.innerWidth / 12
        }
    },
    mounted() {
        window.addEventListener('resize', this.handleResize);
    },
    beforeUnmount() {
        window.removeEventListener('resize', this.handleResize);
    }
}
</script>

<style scoped>
.flex {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    max-width: 1000px;
}

.filename {
    width: 210px;
}

.cyan {
    color: #00ffff;
}

.grey {
    color: darkgray;
    white-space: pre;
}

.directory {
    color: #3b78ff;
}

.executable {
    color: lime;
}

.file {
    color: white;
}

.img {
    color: #ac7ea7;
}
</style>
