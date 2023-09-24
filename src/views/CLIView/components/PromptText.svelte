<script lang="ts">
    import {CurrentPath} from "../../../stores/";

    export let path: CLI.Path = $CurrentPath;
</script>

<span class="wrapper">
    <span class="name">aureliendumay.me</span>:{#each path as dir}<span class="dir">{dir}</span>/{/each}$&nbsp;
</span>

<style>
    .name {
        color: var(--green);
    }

    .dir {
        color: var(--cyan);
    }
</style>