<script lang="ts">
    import {afterUpdate} from "svelte";

    import {Cleared, CurrentPath, DeviceInfo, InputHistoryStack, PreviousCommands} from "../../stores";
    import clear from "./cli/bin/clear";

    import WelcomeText from "./components/WelcomeText.svelte";
    import PromptText from "./components/PromptText.svelte";
    import LoadingIndicator from "../../core/LoadingIndicator.svelte";
    import run from "./cli/run";
    import OutputParser from "./components/OutputParser.svelte";

    // A span element with contenteditable property set to true -> gets input
    let inputEl: HTMLSpanElement;

    // Disables the input when set to false
    let loading: boolean = false;

    // To check if the command key is down -> control also enables it on windows and linux
    let isCommandDown: boolean = false;
    // To check if the control key is down
    let isControlDown: boolean = false;
    // To check if the shift key is down
    let isShiftDown: boolean = false;

    // To navigate through the input history stack
    let currentHistoryStackIndex: number = -1;
    // The last saved value -> saved when incrementing currentHistoryStackIndex
    // and displayed when currentHistoryStackIndex is back to -1
    let inputSavedValue: string = "";

    /**
     * On key down anywhere on the page
     * @param e
     */
    async function handleKeyDown(e: Event): Promise<void>
    {
        const key = (e as KeyboardEvent).key;

        switch (key.toLowerCase()) {
            // Prevents the tab key from updating the focus
            case "tab":
                e.preventDefault();
                return;
            // May clear the history when control is pressed
            case "l":
                if (isControlDown && !isShiftDown) {
                    e.preventDefault();
                    clear();
                }
                return;
            // Sets isControlDown to true (and maybe isCommandDown too)
            case "control":
                isControlDown = true;
                if ($DeviceInfo?.keyboard === "default")
                    isCommandDown = true;
                return;
            // Sets isCommandDown to true on Apple devices
            case "meta":
                if ($DeviceInfo?.keyboard === "apple")
                    isCommandDown = true;
                return;
        }

        // if the input is NOT focused
        if (document.activeElement !== inputEl) {
            if (key === "Shift")
                isShiftDown = true;

            // after a Copy action, focuses back the input
            if (!loading && (!isCommandDown && key !== "C")) {
                focusInputAndMoveCaretAtTheEnd();
                window.scrollTo(0, document.body.scrollHeight);
            }
        }
        // if the input IS focused
        else {
            // Sets the currentHistoryStackIndex back to -1 on previous input edition
            if (inputEl.innerText !== inputSavedValue)
                currentHistoryStackIndex = -1;

            if (key === "ArrowUp" || key === "ArrowDown") {
                e.preventDefault();
                navigateThroughHistoryStack(key);
            }

            // RUNS A COMMAND
            if (key === "Enter") {
                e.preventDefault();
                // loading animation + disables the input
                loading = true;
                // Runs the input (sends the current path)
                await run(inputEl.innerText, $CurrentPath);
                // So we need to reset the currentHistoryStackIndex
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
                console.log("ca marche")
                if (currentHistoryStackIndex === -1)
                    inputSavedValue = inputEl.innerText;

                currentHistoryStackIndex++;

                inputEl.innerText = $InputHistoryStack[currentHistoryStackIndex];
            }
        }
        else { // ArrowDown
            console.log("here", currentHistoryStackIndex)
            if (currentHistoryStackIndex > 0) {
                currentHistoryStackIndex--;

                inputEl.innerText = $InputHistoryStack[currentHistoryStackIndex];
            }
            else if (currentHistoryStackIndex === 0) {
                currentHistoryStackIndex--;

                inputEl.innerText = inputSavedValue;
            }
        }

        console.log(currentHistoryStackIndex)
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
    {#each $PreviousCommands as previousElement, index (index)}
        <div>
            <PromptText path={previousElement.path}/><!--
            --><span class="previous-input">{previousElement.command.input}</span>
            {#if previousElement.command.output}
                {#each previousElement.command.output as output, index (index)}
                    <OutputParser {output}/>
                {/each}
            {/if}
        </div>
    {/each}
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

    .previous-input {
        white-space: pre;
    }
</style>
