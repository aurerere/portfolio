<script lang="ts">
    import { Router, Route } from "svelte-navigator";
    import FormalView from "./views/FormalView.svelte";
    import CliView from "./views/CliView.svelte";
    import NotFoundView from "./views/NotFoundView.svelte";

    let url = window.location.pathname;
</script>

<Router {url}>
    <Route path="/"><FormalView/></Route>
    <Route path="/cli"><CliView/></Route>
    <Route><NotFoundView/></Route>
</Router>
