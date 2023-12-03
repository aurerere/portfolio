<script lang="ts">
    import Fa from "svelte-fa";
    import {getIconFromString} from "@utils/functions";

    export let tag: string;
</script>

<div>
    <Fa icon={getIconFromString(tag, "tag")}/> {tag}
</div>


<style>
    div {
        padding: 4px 6px;
        /*background: #3a3a3a;*/
        background: var(--very-dark-gray);
        /*border: 1px solid var(--dark-gray);*/
        color: var(--gray);
        width: fit-content;
        border-radius: 6px;
    }
</style>
