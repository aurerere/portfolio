<script lang="ts">
    import {faAddressCard, faEnvelope, faFileCode, faTerminal} from "@fortawesome/free-solid-svg-icons";
    import {Lang} from "@stores";
    import Fa from "svelte-fa";

    export let data: Formal.Data["menu"];

    function openCLI() {
        window.open("/cli", "", "width=1000,height=1000");
    }

    function changeLang() {
        $Lang = $Lang === "fr" ? "en" : "fr";
    }

    function handleKeyPress(e: Event) {
        if ((e as KeyboardEvent).key === " " || (e as KeyboardEvent).key === "Enter")
            changeLang();
    }
</script>

<nav>
    <ul>
        <li><Fa icon={faAddressCard}/> {data.landing[$Lang]}</li>
        <li><Fa icon={faFileCode}/> {data.projects[$Lang]}</li>
        <li><Fa icon={faEnvelope}/> {data.contact[$Lang]}</li>
        <li><button on:click={openCLI}><Fa icon={faTerminal}/> {data.cli[$Lang]}</button></li>
        <li>
            <div role="button" class="lang-selector" tabindex="0" on:click={changeLang} on:keypress={handleKeyPress}>
                <div class="selection-highlighter {$Lang}"></div>
                <div class="lang-option {$Lang === 'fr' ? 'selected' : ''}">fr</div>
                <div class="lang-option {$Lang === 'en' ? 'selected' : ''}">en</div>
            </div>
        </li>
    </ul>
</nav>

<style>
    nav ul {
        margin: 0;
        display: flex;
        align-items: center;
        list-style: none;
        padding: 0;
        gap: var(--medium-spacing);
        font-weight: bold;
    }

    .lang-selector {
        user-select: none;
        cursor: pointer;
        position: relative;
        display: flex;
        border: var(--border);
        border-radius: var(--small-spacing);
    }

    .lang-option {
        padding: var(--small-spacing);
        z-index: 2;
        transition: .3s;
        font-weight: bold;
    }

    .lang-option.selected {
        color: var(--background-color);
    }

    .selection-highlighter {
        position: absolute;
        top: -1px;
        width: 50%;
        height: 100%;
        background: white;
        border: 1px solid white;
        transition: .3s;
    }

    .selection-highlighter.fr {
        left: -1px;
        border-radius: var(--small-spacing) 0 0 var(--small-spacing);
    }

    .selection-highlighter.en {
        left: calc(50% + 1px);
        border-radius: 0 var(--border-radius) var(--border-radius) 0;
    }
</style>