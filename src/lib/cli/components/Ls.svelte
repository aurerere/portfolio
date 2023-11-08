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
    <p class="grid">
        {#each Object.entries(result) as [element, type]}
            {#if a || !element.startsWith(".")}
                <span style="color: {getColorElementType(type)}">{element}</span>
            {/if}
        {/each}
    </p>
{:else}
    <p>
        {#each Object.entries(result) as [element, type]}
            {#if a || !element.startsWith(".")}
                {#if type === -1}
                    <span>drwxr-xr-x</span>
                {:else if type === "bin"}
                    <span>-rwxrwxrwx</span>
                {:else}
                    <span>-rw-r--r--</span>
                {/if}
                <span>root</span>
                <span>{new Date().toDateString()}</span>
                <span>{element}</span><br>
            {/if}
        {/each}
    </p>
{/if}

<style>
    .grid span {
        flex: 1;
    }

    .grid {
        display: grid;
        grid-column-gap: 10px;
        max-width: 700px;
        grid-auto-columns: 1fr;
        grid-template-columns: repeat(auto-fill, 150px);
    }
</style>
