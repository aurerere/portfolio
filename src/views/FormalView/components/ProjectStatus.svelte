<script lang="ts">
    import Fa from "svelte-fa";
    import {faCheck, faCode} from "@fortawesome/free-solid-svg-icons";
    import {Lang} from "@stores";

    // const statusText = {
    //     done: {
    //         fr: "Fini",
    //         en: "Done"
    //     },
    //     inDev: {
    //         fr: "En développement",
    //         en: "In development"
    //     }
    // }

    export let status: Formal.Project["status"];
</script>

<div>
<!--    <Fa icon={done ? faCheck : faCode} class={done ? "done" : "in-dev"}/>-->
<!--    <span>{done ? statusText.done[$Lang] : statusText.inDev[$Lang]}</span>-->
<div>
    {status}
</div>
</div>


<style>
    div {
        padding: 4px 6px;
        background: #3a3a3a;
        width: fit-content;
        border-radius: 6px;
    }
</style>
