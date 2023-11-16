<script lang="ts">
    export let
        result: string[],
        n: boolean,
        b: boolean,
        v: boolean,
        t: boolean,
        e: boolean;

    let lineNumber: number = 0;

    function getLineNumber(line: string): number | string
    {
        if (b && line === "")
            return "&nbsp;";
        return ++lineNumber;
    }

    function transformLine(line: string)
    {
        if (t)
            line = line.replaceAll(/\t+/g, "^T");
        if (e)
            line += "$";

        if ((line === "" || line.trim() === "") && !n && !b)
            line = "<br>";

        return line;
    }
</script>

<svelte:options immutable/>
{#if n || b}
    {#each result as line, index (index)}
        <div class="counted-line">
            <div class="counter-counted-line">{@html getLineNumber(line)}</div>
            <div class="content-counted-line">
                <pre>{@html transformLine(line)}</pre>
            </div>
        </div>
    {/each}
{:else}
    {#each result as line, index (index)}
        <pre>{@html transformLine(line)}</pre>
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

    .pre {
        white-space: pre;
    }
</style>
