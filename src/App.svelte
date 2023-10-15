<script lang="ts">
    import {Router, Route} from "svelte-routing";
    import {onMount} from "svelte";

    import {DeviceInfo} from "./stores";
    import {getDeviceInfo} from "./lib/utils/functions";

    import FormalView from "./views/FormalView/FormalView.svelte";
    import NotFoundView from "./views/NotFoundView/NotFoundView.svelte";
    import CLIView from "./views/CLIView/CLIView.svelte";

    let url = window.location.pathname;

    onMount(() => {
        const lang = localStorage.getItem("lang");
        $DeviceInfo = getDeviceInfo();
    });
</script>

<Router {url}>
    <Route path="/" component="{FormalView}"/>
    <Route path="/cli" component={CLIView}/>
    <Route component="{NotFoundView}"/>
</Router>
