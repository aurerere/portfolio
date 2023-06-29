<script lang="ts">
import { Router, Route } from "svelte-navigator";
import { onMount } from "svelte";

import FormalView from "./views/FormalView/FormalView.svelte";
import CliView from "./views/CliView/CliView.svelte";
import NotFoundView from "./views/NotFoundView/NotFoundView.svelte";

let url = window.location.pathname;

onMount(() => {
    const lang = localStorage.getItem("lang");
});
</script>

<Router {url}>
    <Route path="/"><FormalView/></Route>
    <Route path="/cli"><CliView/></Route>
    <Route><NotFoundView/></Route>
</Router>
