<template>
    <br>
    <span class="grey">Directory: </span>
    <template v-for="dir in path" :key="dir">
        <span class="cyan">{{ dir }}</span>
        <span class="separator">/</span>
    </template>
    <br>
    <br>
    <span class="flex">
        <span class="grey">| NAME {{ " ".repeat(winWidth - (winWidth > 4 ? 4 : 0)) }} | TYPE</span>
    </span>
    <span class="grey">{{ "~".repeat(winWidth + 11) }}</span>
    <br>
    <template v-for="(key, name) in result" v-bind:key="key">
    <span>
        <span class="grey">| </span>
        <span :class="'filename ' + (typeof key === 'object' ? 'directory' : key)">{{ name }}</span>
        <span class="grey">
            {{" " + "-".repeat(winWidth - (winWidth > name.length ? name.length : winWidth)) + " " }}
        </span>
    </span>
        <span class="grey">| </span>
        <span class="grey">{{ typeof key === 'string' ? (typesDict[key] ? typesDict[key] : key) : 'dir' }}</span>
        <br>
    </template>
    <br>
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
    flex-direction: row;
    flex-wrap: wrap;
}

.filename {
    white-space: pre;
    width: 50%;
    max-width: 500px;
}

.cyan {
    color: #00ffff;
}

.grey {
    color: darkgray;
    white-space: pre;
}

.directory {
    color: #6380ac;
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