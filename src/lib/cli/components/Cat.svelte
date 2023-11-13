<script lang="ts">
    import {onMount} from "svelte";

    export let result: string[];
    export let
        n: boolean,
        b: boolean,
        v: boolean,
        t: boolean,
        e: boolean;

    export let lineNumber: number = 0;

    function getLineNumber(line: string): number | string {
        if (b && line === "")
            return "&nbsp;";
        else
            return ++lineNumber;
    }

    onMount(() => {
        console.log(result)
    })
</script>

{#if n || b}
    {#each result as value, index (index)}
        <div class="counted-line">
            <div class="counter-counted-line">{@html getLineNumber(value)}</div>
            <div class="content-counted-line">
                {#if t}{value = value.replaceAll(/\t+/g, "^T")}{/if}<!--
                -->{value !== "" ? value : ""}<!--
                -->{#if e}${/if}
            </div>
        </div>
    {/each}
{:else}
    {#each result as value, index (index)}
        <div>
            {#if t}{value = value.replaceAll(/\t+/g, "^T")}{/if}<!--
            -->{@html value !== "" ? value : e ? "" : "<br>"}<!--
            -->{#if e}${/if}
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
