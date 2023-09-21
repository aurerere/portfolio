<script lang="ts">
    import {afterUpdate, onMount} from "svelte";

    import {Cleared} from "../../stores";

    import WelcomeText from "./components/WelcomeText.svelte";
    import PromptText from "./components/PromptText.svelte";

    let promptEl: HTMLSpanElement;

    function keydownHook(e: Event) {
        const key = (e as KeyboardEvent).key;
        // Prevents the Tab key from updating the focus
        if (key === "Tab") {
            e.preventDefault();
            return;
        }
    }

    function pasteHook()
    {

    }

    afterUpdate(() => {
        if (promptEl)
            promptEl.focus();
    });

    onMount(() => {
    });
</script>

<main>
    {#if !$Cleared}
        <WelcomeText/>
    {/if}
    <PromptText/>
    <span
        role="textbox"
        tabindex="0"
        on:keydown={keydownHook}
        on:paste={pasteHook}
        bind:this={promptEl}
        contenteditable="true"
        spellcheck="false"
        class="prompt"
    ></span>
</main>

<style>
    main {
        padding: var(--medium-spacing);
        font-size: 1rem;
    }

    .prompt {
        caret-color: lime;
        outline: none;
    }
</style>
