<script lang="ts">
    import {Fa} from "svelte-fa";
    import {faCheck, faCode} from "@fortawesome/free-solid-svg-icons";
    import {Lang} from "../../../stores";

    let lang: "fr" | "en";

    Lang.subscribe(value => lang = value);

    const statusText = {
        done: {
            fr: "Fini",
            en: "Done"
        },
        inDev: {
            fr: "En développement",
            en: "In development"
        }
    }

    export let done: Formal.Project["done"];
</script>

<div>
    <Fa icon={done ? faCheck : faCode} class={done ? "done" : "in-dev"}/>
    <span>{done ? statusText.done[lang] : statusText.inDev[lang]}</span>
</div>
