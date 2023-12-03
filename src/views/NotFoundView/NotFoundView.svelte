<script lang="ts">
    import {NOT_FOUND_ASCII_ART} from "@utils/const";
    import {Link} from "svelte-routing";
    import Fa from "svelte-fa";
    import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
</script>

<div>
    <pre>{NOT_FOUND_ASCII_ART}</pre>
    Not found :/
    <Link to="/"><Fa icon={faArrowLeft}/> Return to a safe place</Link>
</div>

<style>
    pre {
        color: var(--gray);
    }

    div {
        height: 100dvh;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        gap: var(--medium-spacing);
    }
</style>