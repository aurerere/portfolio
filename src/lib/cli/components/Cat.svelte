<script lang="ts">
    import {onMount} from "svelte";

    export let result: string[];
    export let
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

        if (line === "" && !n && !b)
            line = "<br>";


        return line;
    }

    onMount(() => {
        console.log("here")
    })
</script>

{#if n || b}
    {#each result as line, index (index)}
        <div class="counted-line">
            <div class="counter-counted-line">{@html getLineNumber(line)}</div>
            <div class="content-counted-line">
                {transformLine(line)}
            </div>
        </div>
    {/each}
{:else}
    {#each result as line, index (index)}
        <div>
            {@html transformLine(line)}
        </div>
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
