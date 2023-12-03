<script lang="ts">
    import {SvelteComponent} from "svelte";
    import LoadingIndicator from "@core-components/LoadingIndicator.svelte";

    export let
        component: () => Promise<{ default: typeof SvelteComponent<any>; }>;
</script>

{#await component()}
    <div>
        <LoadingIndicator/>
    </div>
{:then loadedComponent}
    <svelte:component this={loadedComponent.default}/>
{/await}

<style>
    div {
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>
