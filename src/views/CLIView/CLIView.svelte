<script lang="ts">
    import {afterUpdate, onMount} from "svelte";

    import {Cleared, DeviceInfo} from "../../stores";

    import WelcomeText from "./components/WelcomeText.svelte";
    import PromptText from "./components/PromptText.svelte";

    let promptEl: HTMLSpanElement;

    let loading: boolean = false;

    let isCommandDown: boolean = false;
    let isControlDown: boolean = false;
    let isShiftDown: boolean = false;

    function handleKeyDown(e: Event): void
    {
        const key = (e as KeyboardEvent).key;

        switch (key) {
            // Prevents the tab key from updating the focus
            case "Tab":
                e.preventDefault();
                return;
            case "L":
                if (isControlDown && !isShiftDown) {
                    e.preventDefault();
                    clear();
                }
                return;
            case "Control":
                isControlDown = true;
                if ($DeviceInfo?.keyboard === "default")
                    isCommandDown = true;
                return;
            case "Meta":
                if ($DeviceInfo?.keyboard === "apple")
                    isCommandDown = true;
                return;
        }

        if (document.activeElement !== promptEl) {
            if (key === "Shift")
                isShiftDown = true;

            if (key.startsWith("Arrow") && isShiftDown)
                return;

            if (!loading && (!isCommandDown && key !== "C")) {
                focusPromptAndMoveCaretAtTheEnd();
                window.scrollTo(0, document.body.scrollHeight);
            }
        }
        else {

        }
    }

    function focusPromptAndMoveCaretAtTheEnd()
    {
        //https://stackoverflow.com/questions/1125292/how-to-move-cursor-to-end-of-contenteditable-entity
        const range = document.createRange();
        const sel = window.getSelection();

        if (!sel)
            return;

        range.selectNodeContents(promptEl);
        range.collapse(false);
        sel.removeAllRanges();
        sel.addRange(range);
        promptEl.focus();
        range.detach(); // optimization

        // set scroll to the end if multiline
        promptEl.scrollTop = promptEl.scrollHeight;
    }

    function handlePaste()
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
    <!-- svelte-ignore a11y-no-static-element-interactions a11y-click-events-have-key-events -->
    <div class="prompt-wrapper" on:click={() => promptEl.focus()}>
        <PromptText/>
        <span
            role="textbox"
            tabindex="0"
            on:keydown={handleKeyDown}
            on:paste={handlePaste}
            bind:this={promptEl}
            contenteditable="true"
            spellcheck="false"
            class="prompt"
        ></span>
    </div>
</main>

<style>
    main {
        padding: var(--medium-spacing);
        font-size: 1rem;
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        min-height: 100vh;
    }

    .prompt {
        caret-color: lime;
        outline: none;
    }

    .prompt-wrapper {
        flex: 1;
        padding-bottom: var(--medium-spacing);
    }
</style>
