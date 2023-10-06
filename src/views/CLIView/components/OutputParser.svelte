<script lang="ts">
    export let output: string | CLI.ComponentDependentBinOutput
</script>

{#if typeof output === "string"}
    {#if output !== "ok"}
        <span>{output}</span>
    {/if}
{:else}

{/if}
