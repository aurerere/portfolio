<script lang="ts">
    import {Lang} from "../../stores/formal";
    import WelcomeText from "./components/WelcomeText.svelte";
</script>

<main>
    {#if !$Cleared}
        <WelcomeText/>
    {/if}
</main>
