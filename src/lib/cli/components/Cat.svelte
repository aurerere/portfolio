<script lang="ts">
    export let
        result: string[],
        n: boolean,
        b: boolean,
        t: boolean,
        e: boolean;

    let lineNumber: number = 0;

    function getLineNumber(line: string): number | string
    {
        if (b && (line === "\r" || line === ""))
            return "&nbsp;";
        return ++lineNumber;
    }

    function transformLine(line: string)
    {
        line = line.replaceAll(/\r/g, "")
        if (t)
            line = line.replaceAll(/\t/g, "^T");
        if (e)
            line += "$";

        if ((line === "" || line.trim() === "") && !n && !b)
            line = "";

        return line;
    }
</script>

<svelte:options immutable/>
{#if n || b}
    {#each result as line, index (index)}
        <div class="counted-line">
            <div class="counter-counted-line">{@html getLineNumber(line)}</div>
            <div class="content-counted-line">
                <pre>{transformLine(line)}</pre>
            </div>
        </div>
    {/each}
{:else}
    {#each result as line, index (index)}
        {@const transformedLine = transformLine(line)}
        {#if transformedLine === ""}
            <br>
        {:else}
            <pre>{transformedLine}</pre>
        {/if}
    {/each}
{/if}

<style>
    .counted-line {
        display: flex;
        gap: 10px;
    }

    .counter-counted-line {
        min-width: 50px;
        text-align: right;
    }
</style>
