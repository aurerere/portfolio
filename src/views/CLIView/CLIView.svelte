<script lang="ts">
    import {afterUpdate} from "svelte";

    import {Cleared, DeviceInfo, InputHistoryStack} from "../../stores";
    import clear from "./cli/bin/clear";

    import WelcomeText from "./components/WelcomeText.svelte";
    import PromptText from "./components/PromptText.svelte";
    import LoadingIndicator from "../../core/LoadingIndicator.svelte";

    let inputEl: HTMLSpanElement;

    let loading: boolean = false;

    let isCommandDown: boolean = false;
    let isControlDown: boolean = false;
    let isShiftDown: boolean = false;

    let currentHistoryStackIndex: number = -1;
    let inputSavedValue: string = "";

    async function handleKeyDown(e: Event): Promise<void>
    {
        const key = (e as KeyboardEvent).key;

        switch (key.toLowerCase()) {
            // Prevents the tab key from updating the focus
            case "tab":
                e.preventDefault();
                return;
            case "l":
                if (isControlDown && !isShiftDown) {
                    e.preventDefault();
                    clear();
                }
                return;
            case "control":
                isControlDown = true;
                if ($DeviceInfo?.keyboard === "default")
                    isCommandDown = true;
                return;
            case "meta":
                if ($DeviceInfo?.keyboard === "apple")
                    isCommandDown = true;
                return;
        }

        if (document.activeElement !== inputEl) {
            if (key === "Shift")
                isShiftDown = true;

            if (key.startsWith("Arrow") && isShiftDown)
                return;

            if (!loading && (!isCommandDown && key !== "C")) {
                focusInputAndMoveCaretAtTheEnd();
                window.scrollTo(0, document.body.scrollHeight);
            }
        }
        else {
            if (inputEl.innerText !== inputSavedValue)
                currentHistoryStackIndex = -1;

            if (key === "ArrowUp" || key === "ArrowDown") {
                e.preventDefault();
                navigateThroughHistoryStack(key);
            }

            if (key === "Enter") {
                e.preventDefault();
                loading = true;
                // run
                inputEl.innerText = "";
                currentHistoryStackIndex = -1;
                loading = false;
            }

        }
    }

    function handleKeyUp(e: Event): void
    {
        const key = (e as KeyboardEvent).key;

        switch (key.toLowerCase()) {
            case "shift":
                isShiftDown = false;
                return;
            case "control":
                isControlDown = false;
                if ($DeviceInfo?.keyboard === "default")
                    isCommandDown = false;
                return;
            case "meta":
                if ($DeviceInfo?.keyboard === "apple")
                    isCommandDown = false;
                return;
        }
    }

    function navigateThroughHistoryStack(key: "ArrowUp" | "ArrowDown")
    {
        if (key === "ArrowUp") {
            if (currentHistoryStackIndex + 1 < $InputHistoryStack.length) {
                if (currentHistoryStackIndex === -1)
                    inputSavedValue = inputEl.innerText;

                currentHistoryStackIndex++;

                inputEl.innerText = $InputHistoryStack[currentHistoryStackIndex];
            }
        }
        else {
            if (currentHistoryStackIndex > 0) {
                currentHistoryStackIndex--;

                inputEl.innerText = $InputHistoryStack[currentHistoryStackIndex];
            }
            else if (currentHistoryStackIndex === 0) {
                currentHistoryStackIndex--;

                inputEl.innerText = inputSavedValue;
            }
        }

        focusInputAndMoveCaretAtTheEnd();
    }


    function focusInputAndMoveCaretAtTheEnd()
    {
        //https://stackoverflow.com/questions/1125292/how-to-move-cursor-to-end-of-contenteditable-entity
        const range = document.createRange();
        const sel = window.getSelection();

        if (!sel)
            return;

        range.selectNodeContents(inputEl);
        range.collapse(false);
        sel.removeAllRanges();
        sel.addRange(range);
        inputEl.focus();
        range.detach(); // optimization

        // set scroll to the end if multiline
        inputEl.scrollTop = inputEl.scrollHeight;
    }

    async function handlePaste(e: ClipboardEvent)
    {
        if (!e.clipboardData)
            return;

        const data = e.clipboardData.getData('Text').replaceAll('\r', '');

    }

    afterUpdate(() => {
        if (inputEl)
            inputEl.focus();
    });
</script>

<svelte:window on:keydown={handleKeyDown} on:keyup={handleKeyUp}/>
<main>
    {#if !$Cleared}
        <WelcomeText/>
    {/if}

    {#if (loading)}
        <LoadingIndicator withMargin/>
    {:else}
        <!-- svelte-ignore a11y-no-static-element-interactions a11y-click-events-have-key-events -->
        <div class="prompt-wrapper" on:click={() => inputEl.focus()}>
            <!-- Workaround: Using HTML comments to prevent unwanted spaces -->
            <PromptText/><!--
            --><span
                on:paste={handlePaste}
                bind:this={inputEl}
                contenteditable="true"
                spellcheck="false"
                class="input"
            ></span>
        </div>
    {/if}
</main>

<style>
    main {
        padding: var(--medium-spacing) var(--medium-spacing) 0 var(--medium-spacing);
        font-size: 1rem;
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        min-height: 100vh;
    }

    .input {
        caret-color: lime;
        outline: none;
        word-break: break-all;
        word-wrap: break-word;
        white-space: break-spaces;
    }

    .prompt-wrapper {
        flex: 1;
        padding-bottom: var(--medium-spacing);
    }
</style>
