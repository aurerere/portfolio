<script lang="ts">
    import {CurrentPath} from "../../../stores/";

    export let path: string[] = $CurrentPath;
</script>

<span class="wrapper">
    <span class="user">aureliendumay.me</span>
    <span>:</span>
    {#each path as dir}
        <span class="dir">{dir}</span>
        <span>/</span>
    {/each}
    <span>$&nbsp;</span>
</span>

<style>
    .wrapper {
        word-wrap: break-word;
        white-space: break-spaces;
    }

    .user {
        color: var(--green);
    }

    .dir {
        color: var(--cyan);
    }
</style>
