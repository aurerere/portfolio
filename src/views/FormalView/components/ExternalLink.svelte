<script lang="ts">
    import Fa from "svelte-fa";
    import type { IconDefinition } from "@fortawesome/fontawesome-common-types";

    export let
        to: string,
        icon: IconDefinition | null = null;

</script>

<a href={to} target="_blank">
    > {#if icon !== null}
        <Fa {icon}/>
    {/if}
    <slot/>
</a>

<style>
    a {
        width: fit-content;
    }
</style>