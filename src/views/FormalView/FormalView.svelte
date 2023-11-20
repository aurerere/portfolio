<script lang="ts">
    import {onMount} from "svelte";
    import LoadingIndicator from "@core-components/LoadingIndicator.svelte";
    import Nav from "./components/Nav.svelte";
    import {Lang} from "@stores";
    import ExternalLink from "@core-components/ExternalLink.svelte";
    import {getIconFromString} from "@utils/functions";

    let loading: boolean = true;
    let data: Formal.Data;

    onMount(() => {
        fetch("/formal.json")
            .then(res => res.json())
            .then(res => {
                data = res;
                loading = false;
            });
    });
</script>

{#if loading}
    <LoadingIndicator/>
{:else}
    <header>
        <div class="container nav-bar">
            <h1 class="no-margin">{data.title}</h1>
            <Nav data={data.menu}/>
        </div>
    </header>
    <main>
        <section id="landing">
            <div class="container">
                <div class="left">
                    <h2>{data.landing.title[$Lang]}</h2>
                    <p>{data.landing.p[$Lang]}</p>
                    <div class="links">
                        {#each data.landing.links as link}
                            <ExternalLink to={link[$Lang].url} icon={getIconFromString(link.icon)}>
                                {link[$Lang].text}
                            </ExternalLink>
                        {/each}
                    </div>
                </div>
                <div class="right"></div>
            </div>
        </section>
    </main>
{/if}

<style>
    h1 { font-size: 2rem }
    h2 { font-size: 1.8rem }
    h3 { font-size: 1.6rem }
    h4 { font-size: 1.4rem }
    h5 { font-size: 1.2rem }

    h1, h2, h3, h4, h5 {
        outline: none;
        margin: 0 0 var(--small-spacing);
    }

    .no-margin {
        margin: 0;
    }

    header {
        display: flex;
        justify-content: center;
        align-items: center;
        border-bottom: var(--border);
        padding: var(--medium-spacing) 0;
        position: fixed;
        width: 100%;
        top: 0;
        left: 0;
    }

    .nav-bar {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    section {
        min-height: calc(100vh - var(--header-height));
        overflow: auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-bottom: var(--big-spacing);
    }

    section#landing {
        min-height: 100vh;
        padding-bottom: 0;
        justify-content: center;
    }

    .links {
        display: flex;
        gap: var(--medium-spacing);
        margin-top: var(--medium-spacing);
        flex-wrap: wrap;
    }

    .container {
        max-width: 1500px;
        width: 100%;
        padding: 0 var(--big-spacing);
        box-sizing: border-box;
    }
</style>
