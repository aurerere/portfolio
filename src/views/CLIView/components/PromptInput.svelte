<script lang="ts">
    import {onDestroy, onMount} from "svelte";
    import {DeviceInfo, InputHistoryStack} from "@stores";
    import clear from "@cli/bin/clear";
    import {getSuggestions} from "@cli/utils/autocompletion";

    export let
        runCommands: (...command: string[]) => Promise<void>,
        value: string;

    export let focusInput: (() => void) | null = null;

    let inputEl: HTMLSpanElement;
    let inputSavedValue: string = "";
    let currentHistoryStackIndex: number = -1;
    let autocompleteSuggestionIndex: number = -1;
    let autocompleteSuggestions: string[] | null = null;

    function handleInput() {
        currentHistoryStackIndex = -1;
        autocompleteSuggestionIndex = -1;
        autocompleteSuggestions = [];
    }

    async function handleKeyDown(e: Event): Promise<void> {
        getCaretPositon();
        const key = (e as KeyboardEvent).key;
        const isControlDown = (e as KeyboardEvent).ctrlKey;
        const isShiftDown = (e as KeyboardEvent).shiftKey;
        const isCommandDown = $DeviceInfo?.keyboard === "apple"
            ? (e as KeyboardEvent).metaKey
            : (e as KeyboardEvent).ctrlKey;

        // Whether the input is focused or not
        switch (key) {
            case "Tab":
                if (document.activeElement === inputEl) {
                    e.preventDefault();
                    handleTab();
                    return;
                }
                break;
            case "L":
                if (isControlDown && !isShiftDown) {
                    e.preventDefault();
                    clear();
                }
                break;
            case "Enter":
                e.preventDefault();
                runCommands(inputEl.innerText).then();
                return;
            case "ArrowUp":
            case "ArrowDown":
                if (document.activeElement === inputEl) {
                    e.preventDefault();
                    navigateThroughHistoryStack(key);
                }
                break;
            case "B":
            case "U":
            case "I":
                if (isCommandDown)
                    e.preventDefault();
                return;
            case "Control":
            case "Command":
            case "Shift":
                return;
        }
        // if the input is NOT focused
        if (document.activeElement !== inputEl) {
            const isSelectingText = isShiftDown && key.startsWith("Arrow");

            if (!isCommandDown && !isSelectingText)
                moveCaret(-1);
        }
    }

    function navigateThroughHistoryStack(key: "ArrowUp" | "ArrowDown") {
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

        moveCaret(-1);
    }

    function handleTab() {
        const caretPos = getCaretPositon();

        let offset: number;
        let before: string;
        let value: string;
        const after = inputEl.innerText.substring(caretPos);

        if (autocompleteSuggestionIndex !== -1 && autocompleteSuggestions !== null) {
            offset = autocompleteSuggestions[autocompleteSuggestionIndex].length;

             before = inputEl.innerText.substring(0, caretPos - offset);

            if (autocompleteSuggestionIndex + 1 <= autocompleteSuggestions.length - 1)
                value = autocompleteSuggestions[++autocompleteSuggestionIndex];
            else
                value = autocompleteSuggestions[autocompleteSuggestionIndex = 0];
        }
        else {
            const [suggestions, replaceAmount] = getSuggestions(inputEl.innerText, caretPos);

            if (suggestions.length > 1) {
                autocompleteSuggestions = suggestions;
                autocompleteSuggestionIndex = 0;
            }
            if (suggestions.length === 0)
                return;

            offset = replaceAmount;
            before = inputEl.innerText.substring(0, caretPos - offset);
            value = suggestions[0];
        }

        inputEl.innerText = before + value + after;
        moveCaret(caretPos - offset + value.length);
    }

    async function handlePaste(e: ClipboardEvent) {
        e.preventDefault();
        if (!e.clipboardData)
            return;

        const data = e.clipboardData.getData("Text").replaceAll(/\r/gm, "");

        if (data.match(/\n/)) {
            const inputs = (inputEl.innerText + data).split(/\n/);

            runCommands(...inputs).then();
        }
        else if (data) {
            const textNode = document.createTextNode(data);
            const selection = window.getSelection();

            if (selection?.rangeCount) {
                const range = selection.getRangeAt(0);
                range.deleteContents();
                range.insertNode(textNode);
                range.setStartAfter(textNode);
                selection.removeAllRanges();
                selection.addRange(range);
            }
        }

        inputEl.normalize();
    }

    function focus() {
        inputEl.focus();
        window.scrollTo(0, document.body.scrollHeight);
    }

    function moveCaret(to: number) {
        const range = document.createRange();
        const sel = window.getSelection();

        if (!sel)
            return;

        if (to === -1) {
            range.selectNodeContents(inputEl);
            range.collapse(false);
        }
        else {
            inputEl.normalize();
            const text = inputEl.childNodes[0];

            if (!text)
                return;
            if (!text.textContent || text.textContent.length < to || to < 0)
                return;

            range.setStart(text, to);
            range.collapse(true);
        }

        sel.removeAllRanges();
        sel.addRange(range);
        range.detach(); // optimization
    }

    function getCaretPositon(): number
    {
        inputEl.normalize();

        const sel = window.getSelection();

        if (!sel)
            return -1;

        const range = sel.getRangeAt(0);
        const preCaretRange = range.cloneRange();

        preCaretRange.selectNodeContents(inputEl);
        preCaretRange.setEnd(range.endContainer, range.endOffset);

        return preCaretRange.toString().length;
    }

    onMount(() => {
        focusInput = focus;
        focus();
    });

    onDestroy(() => {
        focusInput = null;
    })
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
