<template>
    <br>
    <template v-for="(command, commandName) in result" v-bind:key="commandName">
        <span class="command">{{ commandName }}&nbsp;</span>
        <span class="args" v-for="arg in command.args" v-bind:key="arg">&#60;{{ arg }}&#62;</span>
        <br>
        <span class="desc">{{ command.description }}</span>
        <br>
        <br>
    </template>
</template>

<script>
export default {
    name: "HelpResult",
    props: {
        result: Object,
    },
}
</script>

<style scoped>
.darkgrey, .desc {
    color: darkgrey;
}

.command {
    color: cyan;
}
</style>