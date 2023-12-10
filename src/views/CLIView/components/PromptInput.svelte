<script lang="ts">
    import {onMount} from "svelte";
    import {DeviceInfo, InputHistoryStack} from "@stores";
    import clear from "@cli/bin/clear";
    import {getSuggestions} from "@cli/utils/autocompletion";

    export let
        runCommands: (...command: string[]) => Promise<void>,
        value: string;

    let inputEl: HTMLSpanElement;
    let inputSavedValue: string = "";
    let currentHistoryStackIndex: number = -1;
    let autocompleteSuggestionIndex: number = -1;
    let autocompleteSuggestions: string[] | null = null;

    export const focus = () => inputEl.focus();

    /**
     * On key down anywhere on the page
     * @param e
     */
    async function handleKeyDown(e: Event): Promise<void>
    {
        const key = (e as KeyboardEvent).key;
        const isControlDown = (e as KeyboardEvent).ctrlKey;
        const isCommandDown = $DeviceInfo?.keyboard === "apple"
            ? (e as KeyboardEvent).metaKey
            : (e as KeyboardEvent).ctrlKey;
        const isShiftDown = (e as KeyboardEvent).shiftKey;

        // Whether the input is focused or not
        switch (key.toLowerCase()) {
            case "control":
            case "command":
            case "shift":
                return;
            // Prevents the tab key from updating the focus
            case "tab":
                e.preventDefault();
                handleTab();
                return;
            // May clear the history when control is pressed
            case "l":
                if (isControlDown && !isShiftDown) {
                    e.preventDefault();
                    clear();
                }
                break;
            case "b":
            case "u":
            case "i":
                if (isCommandDown)
                    e.preventDefault();
                break;
        }
        // if the input is NOT focused
        if (document.activeElement !== inputEl) {

            const isCopyingText = isCommandDown && key.toLowerCase() === "c";
            const isSelectingText = isShiftDown && key.startsWith("Arrow");

            if (!isCopyingText && !isSelectingText) {
                focusInputAndMoveCaretAtTheEnd();
                window.scrollTo(0, document.body.scrollHeight);
            }
        }
        // if the input IS focused
        else {
            if (key === "ArrowUp" || key === "ArrowDown") {
                e.preventDefault();
                navigateThroughHistoryStack(key);
            }

            // RUNS A COMMAND
            if (key === "Enter") {
                e.preventDefault();
                runCommands(inputEl.innerText).then();
            }

        }
    }

    function handleInput()
    {
        currentHistoryStackIndex = -1;
        autocompleteSuggestionIndex = -1;
        autocompleteSuggestions = [];
    }

    function navigateThroughHistoryStack(key: "ArrowUp" | "ArrowDown")
    {
        if (key === "ArrowUp") { // moves backward in the input history
            if (currentHistoryStackIndex + 1 < $InputHistoryStack.length) {
                if (currentHistoryStackIndex === -1)
                    inputSavedValue = inputEl.innerText;

                inputEl.innerText = $InputHistoryStack[++currentHistoryStackIndex];
            }
        }
        else { // ArrowDown - moves forward in the input history
            if (currentHistoryStackIndex > 0)
                inputEl.innerText = $InputHistoryStack[--currentHistoryStackIndex];

            else if (currentHistoryStackIndex === 0) {
                inputEl.innerText = inputSavedValue;
                currentHistoryStackIndex = -1;
            }
        }

        focusInputAndMoveCaretAtTheEnd();
    }

    function handleTab()
    {
        if (autocompleteSuggestionIndex !== -1 && autocompleteSuggestions !== null) {
            const replaceFrom =
                inputEl.innerText.length - autocompleteSuggestions[autocompleteSuggestionIndex].length

            if (autocompleteSuggestionIndex + 1 <= autocompleteSuggestions.length - 1) {
                inputEl.innerText =
                    inputEl.innerText.substring(0, replaceFrom) +
                    autocompleteSuggestions[++autocompleteSuggestionIndex];
            }
            else {
                autocompleteSuggestionIndex = 0;

                inputEl.innerText =
                    inputEl.innerText.substring(0, replaceFrom) +
                    autocompleteSuggestions[0];
            }
        }
        else {
            const [suggestions, replaceAmount] = getSuggestions(inputEl.innerText);

            if (suggestions.length >= 1) {
                if (suggestions.length > 1) {
                    autocompleteSuggestions = suggestions;
                    autocompleteSuggestionIndex = 0;
                }

                inputEl.innerText =
                    inputEl.innerText.substring(0, inputEl.innerText.length - replaceAmount) +
                    suggestions[0];
            }
        }

        focusInputAndMoveCaretAtTheEnd();
    }

    async function handlePaste(e: ClipboardEvent)
    {
        console.log("here")
        if (!e.clipboardData)
            return;

        const data = e.clipboardData?.getData('Text').replaceAll(/\r/gm, '');

        if (data.match(/\n/)) {
            const inputs = data.split(/\n/);

            runCommands(...inputs).then();
        }
        else if (data) {
            inputEl.innerText = data;
            focusInputAndMoveCaretAtTheEnd();
        }

        e.preventDefault();
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

    onMount(() => {
        inputEl.focus();
        window.scrollTo(0, document.body.scrollHeight);
        focusInputAndMoveCaretAtTheEnd();
    });
</script>

<svelte:window on:keydown={handleKeyDown}/>
<span
    on:paste={handlePaste}
    on:input={handleInput}
    bind:this={inputEl}
    contenteditable="true"
    spellcheck="false"
    class="input"
>{value}</span>

<style>
    .input {
        caret-color: var(--cyan);
        outline: none;
        word-break: break-all;
        word-wrap: break-word;
        white-space: break-spaces;
    }
</style>
