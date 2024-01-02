<script lang="ts">
    export let
        result: { [key: string]: CLI.FolderMetadata | CLI.File },
        a: boolean,
        l: boolean;

    function getElementColorByRole(role: string) {
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

<svelte:options immutable/>
{#if !l}
    <div class="short">
        {#each Object.entries(result) as [name, metadata]}
            {#if a || !metadata.hidden}
                <span style="color: {getElementColorByRole(metadata.role)}">{name}</span>
            {/if}
        {/each}
    </div>
{:else}
    <p class="long">
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
                <span>root</span>
                <span>{metadata.blksize}</span>
                <span>{metadata.mtime}</span>
                <span class="left" style="color: {getElementColorByRole(metadata.role)}">{name}</span>
            {/if}
        {/each}
    </p>
{/if}

<style>
    /*.short span {*/
    /*    width: 200px;*/
    /*}*/
    span, p {
        width: fit-content;
    }

    /* TODO: Real ls like display */
    .short {
        display: flex;
        flex-direction: column;
    }

    .long {
        width: fit-content;
        gap: 0 10px;
        display: grid;
        grid-template-columns: repeat(7, auto);
    }

    .long span {
        width: 100%;
    }

    .long span:not(.left){
        text-align: right;
    }
</style>
