<script lang="ts">
    import {Router, Route} from "svelte-routing";
    import {onMount} from "svelte";

    import LazyLoadedComponent from "@core-components/LazyLoadedComponent.svelte";

    import {setDeviceInfo, setLang} from "@utils/functions";

    let url = window.location.pathname;

    onMount(() => {
        setDeviceInfo();
        setLang();
    });
</script>

<Router {url}>
    <Route path="/">
        <LazyLoadedComponent component={() => import("@views/FormalView/FormalView.svelte")}/>
    </Route>
    <Route path="/cli">
        <LazyLoadedComponent component={() => import("@views/CLIView/CLIView.svelte")}/>
    </Route>
    <Route>
        <LazyLoadedComponent component={() => import("@views/NotFoundView/NotFoundView.svelte")}/>
    </Route>
</Router>
