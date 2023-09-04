<script lang="ts">
    import WelcomeText from "./components/WelcomeText.svelte";
    import {Cleared} from "../../stores/cli";

    let prompt: HTMLSpanElement;

    // Prevents the Tab key from updating the focus
    const tabHook = (e: Event) => (e as KeyboardEvent).key === "Tab" ? e.preventDefault(): null;

    function pasteHook()
    {

    }
</script>

<main>
    {#if !$Cleared}
        <WelcomeText/>
    {/if}
    <span
        on:keydown={tabHook}
        on:paste={pasteHook}
        bind:this={prompt}
        contenteditable="true"
        spellcheck="false"
        class="prompt"
    >s</span>
</main>

<style>
    main {
        padding: var(--medium-spacing);
        font-size: 1rem;
    }
</style>
