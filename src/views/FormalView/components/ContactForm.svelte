<script lang="ts">
import {Lang} from "@stores";
import {faPaperPlane} from "@fortawesome/free-solid-svg-icons";
import LoadingIndicator from "@core-components/LoadingIndicator.svelte";
import Fa from "svelte-fa";

// props
export let
    fieldNames: Formal.Data["contact"]["form_fields"];

let isBusy: boolean = false;

async function sendMessage(data: SubmitEvent)
{
    isBusy = true;
    // const formData = new FormData(data.currentTarget as HTMLFormElement);
    // const body = Object.fromEntries(formData);
    //
    // const res = await fetch("https://api.web3forms.com/submit", {
    //     method: "POST",
    //     headers: {
    //        "Content-type": "application/json",
    //        Accept: "application/json"
    //     },
    //     body: JSON.stringify(body)
    // });
    //
    // if (res.ok) {
    //
    // }
}
</script>

<form on:submit|preventDefault={sendMessage}>
    <input type="hidden" name="access_key" value="bda200a1-f720-4963-87d6-151c68aeaa6d">

    <label for="name">
        {fieldNames.name[$Lang]}
        <input disabled={isBusy} type="text" name="name" placeholder="John Doe" required />
    </label>
    <label for="email">
        {fieldNames.email[$Lang]}
        <input disabled={isBusy} type="email" name="email" placeholder="johndoe@example.com" required />
    </label>
    <label for="message">
        {fieldNames.message[$Lang]}
        <textarea disabled={isBusy} name="message" placeholder="Lorem ipsum" required rows="3"></textarea>
    </label>
    <button type="submit" disabled={isBusy}>
        {#if isBusy}
            <LoadingIndicator/>
        {:else}
            <Fa icon={faPaperPlane}/> {fieldNames.send[$Lang]}
        {/if}
    </button>
</form>

<style>
    form {
        display: flex;
        gap: var(--medium-spacing);
        flex-direction: column;
    }

    input, textarea {
        background: var(--very-dark-gray) !important;
        color: var(--text-color) !important;
        border: var(--border);
        outline: none;
        padding: var(--small-spacing);
        border-radius: var(--border-radius);
        font-family: "JetBrains Mono", monospace;
        font-size: 1rem;
        transition: .2s;
    }

    textarea {
        resize: none;
        width: 100%;
        height: 300px;
        box-sizing: border-box;
    }

    input:focus, textarea:focus {
        border-color: var(--focus-or-hover-border-color);
        background: var(--focus-or-hover-bg-color) !important;
    }

    input:focus + label {
        color: white;
    }

    label {
        display: flex;
        flex-direction: column;
        gap: var(--micro-spacing);
        color: var(--gray)
    }

    label:focus {
        color: white;
    }

    label > :not(input) {
        margin-right: var(--small-spacing);
    }

    button[disabled] {
        cursor: default;
    }

    button[disabled]:hover {
        background: var(--very-dark-gray);
        border-color: var(--dark-gray);
        cursor: default;
    }

    input[disabled], textarea[disabled] {
        color: var(--gray) !important;
    }
</style>