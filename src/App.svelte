<script lang="ts">
import { Router, Route } from "svelte-navigator";
    import FormalView from "./views/FormalView/FormalView.svelte";
    import CliView from "./views/CLIView/CliView.svelte";
import NotFoundView from "./views/NotFoundView.svelte";
import {onMount} from "svelte";

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
