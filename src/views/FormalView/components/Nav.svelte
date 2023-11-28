<script lang="ts">
    import {faAddressCard, faEnvelope, faFileCode, faTerminal} from "@fortawesome/free-solid-svg-icons";
    import {Lang} from "@stores";
    import Fa from "svelte-fa";

    // props
    export let
        phoneVersion: boolean = false,
        data: Formal.Data["menu"],
        scrollTo: (sectionId: string) => () => void;

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

<nav class:phone={phoneVersion}>
    <ul>
        <li class="section">
            <a class="no-style" href="#home" on:click|preventDefault={scrollTo("home")}>
                <Fa icon={faAddressCard}/> {data.landing[$Lang]}
            </a>
        </li>
        <li class="section">
            <a class="no-style" href="#projects" on:click|preventDefault={scrollTo("projects")}>
                <Fa icon={faFileCode}/> {data.projects[$Lang]}
            </a>
        </li>
        <li class="section">
            <a class="no-style" href="#contact" on:click|preventDefault={scrollTo("contact")}>
                <Fa icon={faEnvelope}/> {data.contact[$Lang]}
            </a>
        </li>
        <li>
            <button on:click={openCLI}><Fa icon={faTerminal}/> {data.cli[$Lang]}</button>
        </li>
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

    nav.phone ul {
        flex-direction: column;
        align-items: flex-start;
    }

    .lang-selector {
        user-select: none;
        cursor: pointer;
        position: relative;
        display: flex;
        border: var(--border);
        border-radius: var(--small-spacing);
        outline: none;
    }

    .lang-option {
        padding: var(--small-padding);
        z-index: 2;
        transition: .3s;
        font-weight: bold;
    }

    .selection-highlighter {
        position: absolute;
        top: -2px;
        width: 50%;
        height: 100%;
        background: var(--very-dark-gray);
        border: var(--border);
        border-radius: var(--border-radius);
        transition: .3s;
    }

    .selection-highlighter.fr {
        left: -2px;
    }

    .selection-highlighter.en {
        left: calc(50% - 2px);
    }

    .section a {
        color: var(--text-color);
    }

    .section a:hover {
        text-decoration: none;
    }
</style>
