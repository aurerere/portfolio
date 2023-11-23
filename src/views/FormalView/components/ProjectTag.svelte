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
        background: #3a3a3a;
        width: fit-content;
        border-radius: 6px;
    }
</style>
