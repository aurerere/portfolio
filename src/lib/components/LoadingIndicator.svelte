<script lang="ts">
    import {onDestroy, onMount} from "svelte";
    import {LOADING_SEQUENCE} from "@utils/const";

    export let withMargin: boolean = false;

    let currentIndex = 0;
    let current = LOADING_SEQUENCE[currentIndex];
    let interval: ReturnType<typeof setInterval>;

    onMount(() => {
        interval = setInterval(() => {
            if (currentIndex < LOADING_SEQUENCE.length - 1)
                current = LOADING_SEQUENCE[++currentIndex];
            else
                current = LOADING_SEQUENCE[currentIndex = 0];
        }, 100);
    });

    onDestroy(() => {
        clearInterval(interval);
    })
</script>

<p class={withMargin ? "with-margin" : null} style="color: var(--gray)">
    <span >{current}</span> Loading
</p>

<style>
    .with-margin {
        margin-bottom: var(--medium-spacing);
    }
</style>
