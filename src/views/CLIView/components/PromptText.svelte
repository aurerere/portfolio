<script lang="ts">
    import {CurrentPath} from "@stores";

    export let path: string[] = $CurrentPath;
</script>

<svelte:options immutable/>
<!-- Workaround: Using HTML comments to prevent unwanted spaces -->
<span class="wrapper"><!--
    --><span class="user">aureliendumay.me</span><!--
    --><span>:</span><!--
    -->{#each path as dir, index (index)}<!--
    --><span class="dir">{dir}</span><!--
        -->{#if index < path.length - 1}<!--
            --><span>/</span><!--
        -->{/if}<!--
    -->{/each}<!--
    --><span>$&nbsp;</span><!--
--></span>

<style>
    .wrapper {
        word-break: break-all;
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
