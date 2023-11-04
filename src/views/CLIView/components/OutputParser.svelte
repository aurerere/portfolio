<script lang="ts">
    export let output: string | CLI.ComponentDependentBinOutput
</script>

{#if typeof output === "string"}
    {#if output !== ""}
        <br>
        <pre>{output}</pre>
    {/if}
{:else}
    <svelte:component this={output.component} {...output.data}/>
{/if}
