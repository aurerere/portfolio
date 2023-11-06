<script lang="ts">
    export let result: { [key: string]: string | -1 };
    export let a: boolean;
    export let l: boolean;

    function getColorElementType(fileType: string | -1)
    {
        switch (fileType) {
            case -1:
                return "#3b78ff";
            case "bin":
                return "lime";
            default:
                return "white";
        }
    }
</script>

{#if !l}
    <p>
        {#each Object.entries(result) as [element, type]}
            {#if element.startsWith(".")}
                {#if a}
                    <span style="color: {getColorElementType(type)}">{element}</span>
                {/if}
            {:else}
                <span style="color: {getColorElementType(type)}">{element}</span>
            {/if}
        {/each}
    </p>

{/if}

<style>
    span {
        flex: 1;
    }

    p {
        display: grid;
        grid-column-gap: 10px;
        max-width: 700px;
        grid-auto-columns: 1fr;
        grid-template-columns: repeat(auto-fill, 150px);
    }
</style>
