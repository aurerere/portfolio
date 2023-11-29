<script lang="ts">
    import {Router, Route} from "svelte-routing";
    import {onMount} from "svelte";

    import {DeviceInfo, Lang} from "@stores";
    import {getDeviceInfo, getLang} from "@utils/functions";

    import FormalView from "./views/FormalView/FormalView.svelte";
    import NotFoundView from "./views/NotFoundView/NotFoundView.svelte";
    import CLIView from "./views/CLIView/CLIView.svelte";

    let url = window.location.pathname;

    onMount(() => {
        $DeviceInfo = getDeviceInfo();
        $Lang = getLang();
    });
</script>

<Router {url}>
    <Route path="/" component={() => import("./views/FormalView/FormalView.svelte")}/>
    <Route path="/cli" component={() => import("./views/NotFoundView/CLIView.svelte")}/>
    <Route component={() => import("./views/NotFoundView/NotFoundView.svelte")}/>
</Router>
