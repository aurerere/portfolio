<script lang="ts">
    import {onMount} from "svelte";

    export let closedCallback = () => void;

    let dialogEl: HTMLDialogElement;

    function close() {
        dialogEl.close();
        closedCallback();
    }

    function handleKeyDown (e: Event) {
        if ((e as KeyboardEvent).key === "Escape")
            close();
    }

    onMount(() => {
        dialogEl.showModal();
    })
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog bind:this={dialogEl} on:click|self={() => close()} on:keydown={handleKeyDown}>
    <article></article>
</dialog>

<style>
    article {

    }
</style>