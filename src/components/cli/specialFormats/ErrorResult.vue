<template>
    <span v-for="line in result.split('\n')" v-bind:key="line">{{ line }}<br></span>
</template>

<script>
export default {
    name: "ErrorResult",
    props: {
        result: {
            type: String,
            required: true
        }
    }
};
</script>

<style scoped>
span {
    color: lightcoral;
    word-wrap: break-word;
    white-space: break-spaces;
}

.err-title {
    text-decoration: underline;
}
</style>