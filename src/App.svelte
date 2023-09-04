<script lang="ts">
    import { Router, Route } from "svelte-navigator";
    import FormalView from "./views/FormalView/FormalView.svelte";
    import NotFoundView from "./views/NotFoundView/NotFoundView.svelte";
    import { onMount } from "svelte";
    import CLIView from "./views/CLIView/CLIView.svelte";

    let url = window.location.pathname;

    onMount(() => {
        const lang = localStorage.getItem("lang");
    });
</script>

<Router {url} primary={false}>
    <Route path="/"><FormalView/></Route>
    <Route path="/cli"><CLIView/></Route>
    <Route><NotFoundView/></Route>
</Router>
