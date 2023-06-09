<script lang="ts">
    import { Router, Route } from "svelte-routing";
    import FormalView from "./views/FormalView.svelte";
    import CliView from "./views/CliView.svelte";
    import NotFoundView from "./views/NotFoundView.svelte";

    let url = window.location.pathname;
</script>

<Router {url}>
    <Route path="/" component={FormalView}/>
    <Route path="/cli" component={CliView}/>
    <Route component={NotFoundView}/>
</Router>
