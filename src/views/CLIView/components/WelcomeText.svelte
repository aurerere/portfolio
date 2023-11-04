<script lang="ts">
    import {Link} from "svelte-routing";

    import {getDeviceInfo} from "@utils/functions";
    import {AURE_CLI_ASCII} from "@utils/const";
    import run from "@cli/core/run";
    import {CurrentPath} from "@stores";
</script>

<pre class="green">
{AURE_CLI_ASCII}{import.meta.env.VITE_VERSION}
</pre>
<p>
    <br>
    {#if getDeviceInfo().device === "mobile"}
        <span class="red">
            Warning: This interface is not optimized for touch devices,
            it is recommended to visit the formal version (available at
            <Link to="/">https://aureliendumay.me/</Link>).
        </span>
    {:else}
        If your not used to this type of interface, you can access the formal version at
        <Link to="/">https://aureliendumay.me/</Link>.
    {/if}
    <br><br>
    Type
    <!-- svelte-ignore a11y-no-static-element-interactions a11y-click-events-have-key-events -->
    <span class="help" on:click={() => run("help", $CurrentPath)}>'help'</span>
    for the list of available commands.
    <br><br>
</p>

<style>
    .help {
        text-decoration: none;
        color: var(--cyan);
        white-space: nowrap;
        cursor: pointer;
    }

    .help:hover {
        text-decoration: underline;
    }
</style>
