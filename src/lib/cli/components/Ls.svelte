<script lang="ts">
    export let result: { [key: string]: CLI.FolderMeta | CLI.File };
    export let a: boolean;
    export let l: boolean;

    function getElementColorByRole(role: string)
    {
        switch (role) {
            case "folder":
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
        {#each Object.entries(result) as [name, metadata]}
            {#if a || !metadata.hidden}
                <span style="color: {getElementColorByRole(metadata.role)}">{name}</span>
            {/if}
        {/each}
    </p>
{:else}
    <p>
        <span>drwxr-xr-x</span>
        <span>10</span>
        <span>root</span>
        <span>4096</span>
        <span>-</span>
        <span>.</span> <br>
        <span>drwxr-xr-x</span>
        <span>10</span>
        <span>root</span>
        <span>4096</span>
        <span>-</span>
        <span>..</span> <br>
        {#each Object.entries(result) as [name, metadata]}
            {#if a || !metadata.hidden}
                {#if metadata.type === "folder"}
                    <span>drwxr-xr-x</span>
                {:else if metadata.role === "bin"}
                    <span>-rwxrwxrwx</span>
                {:else}
                    <span>-rw-r--r--</span>
                {/if}
                <span>{metadata.nlink}</span>
                <span>root</span>
                <span>{metadata.blksize}</span>
                <span>{metadata.mtime}</span>
                <span>{name}</span><br>
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
