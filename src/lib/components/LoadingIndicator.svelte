<script lang="ts">
    import {onDestroy, onMount} from "svelte";

    export let withMargin: boolean = false;

    let movingPipe = "|";
    let interval: ReturnType<typeof setInterval>;

    onMount(() => {
        interval = setInterval(() => {
            switch (movingPipe) {
                case "|":
                    movingPipe = "/";
                    break;
                case "/":
                    movingPipe = "-";
                    break;
                case "-":
                    movingPipe = "\\";
                    break;
                case "\\":
                    movingPipe = "|";
                    break;
            }
        }, 100);
    });

    onDestroy(() => {
        clearInterval(interval);
    })
</script>

<p class={withMargin ? "with-margin" : null}>
    <span style="color: var(--gray)">{movingPipe}</span> Loading
</p>

<style>
    .with-margin {
        margin-bottom: var(--medium-spacing);
    }
</style>
