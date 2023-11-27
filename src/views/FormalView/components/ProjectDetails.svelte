<script lang="ts">
    import {onDestroy, onMount} from "svelte";

    export let closedCallback: () => void;

    let dialogEl: HTMLDialogElement;

    function close() {
        console.log("here")
        dialogEl.close();
        closedCallback();
    }

    function handleKeyDown (e: Event) {
        if ((e as KeyboardEvent).key === "Escape")
            close();
    }

    onMount(() => {
        dialogEl.showModal();
        document.body.style.overflow = "hidden";
    });

    onDestroy(() => {
        document.body.style.overflow = "auto";
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