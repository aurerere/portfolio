<script lang="ts">
    import {Fa} from "svelte-fa";
    import {faCheck, faCode} from "@fortawesome/free-solid-svg-icons";
    import {lang} from "../../stores";

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

    let done: boolean;
</script>

<div>
    <Fa icon={done ? faCheck : faCode} class={done ? "done" : "in-dev"}/>
    <span>{done ? statusText.done[lang] : statusText.inDev[lang]}</span>
</div>
