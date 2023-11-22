<script lang="ts">
    import {onDestroy, onMount} from "svelte";

    import {getIconFromString} from "@utils/functions";
    import {Lang} from "@stores";

    import ExternalLink from "@core-components/ExternalLink.svelte";
    import LoadingIndicator from "@core-components/LoadingIndicator.svelte";
    import Donut from "./components/Donut.svelte";
    import Nav from "./components/Nav.svelte";
    import {faGithub} from "@fortawesome/free-brands-svg-icons";
    import Fa from "svelte-fa";
    import Project from "./components/Project.svelte";

    $: (document.querySelector(":root") as HTMLElement).style.setProperty("--header-height", headerHeight + "px");
    $: scrollHook(scrollY);

    let loading: boolean = true;
    let data: Formal.Data;

    let headerHeight: number = 0;
    let scrollY: number = 0;

    let showScrollSuggestion: boolean = true;

    function scrollHook(scrollVal: number) {

    }

    let projectCardsMousePosSetters: ((x: number, y: number) => void)[] = [];

    function handleMouseMoveOnProjectCards(e: Event)
    {
        for (const setPos of projectCardsMousePosSetters) {
            setPos((e as MouseEvent).clientX, (e as MouseEvent).clientY);
        }
    }

    onMount(() => {
        (document.querySelector("html") as HTMLElement).style.scrollBehavior = "smooth";

        fetch("/formal.json")
            .then(res => res.json())
            .then(res => {
                data = res;
                loading = false;
            });
    });

    onDestroy(() => {
        (document.querySelector("html") as HTMLElement).style.scrollBehavior = "normal";
    })
</script>

<svelte:window bind:scrollY={scrollY}/>
{#if loading}
    <main class="loading">
        <LoadingIndicator/>
    </main>
{:else}
    <header bind:offsetHeight={headerHeight}>
        <div class="container nav-bar">
            <a class="no-style" href="#home">
                <h1 class="no-margin">{data.title}</h1>
            </a>
            <Nav data={data.menu}/>
        </div>
    </header>
    <main>
        <section id="home">
            <div class="container landing">
                <div class="part">
<!--                    <Donut/>-->
                </div>
                <div class="part">
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
            </div>
            <div class="scroll-suggestion" class:hidden={scrollY > 20}><p>↓ Scroll ↓</p></div>
        </section>
        <section id="projects">
            <div class="container">
                <h2 class="section">{data.menu.projects[$Lang]}</h2>
                <!-- svelte-ignore a11y-no-static-element-interactions a11y-mouse-events-have-key-events -->
                <div class="project-grid" on:mousemove={handleMouseMoveOnProjectCards}>
                    {#each data.projects as project, index}
                        <Project {project} bind:setMousePos={projectCardsMousePosSetters[index]}/>
                    {/each}
                </div>
            </div>
        </section>
        <section id="contact">
            <div class="container">
                <h2 class="section">{data.menu.contact[$Lang]}</h2>
            </div>
        </section>
    </main>
    <footer>
        <div class="container footer">
            <p><b>{data.footer.love[$Lang]}</b></p>
            <p>{data.footer.cookies[$Lang]}</p>
            <p>
                <a href="https://github.com/aurerere/portfolio" target="_blank">
                    <Fa icon={faGithub}/>/aurerere/portfolio
                </a>
            </p>
        </div>
    </footer>
{/if}

<style>
    main.loading {
        display: flex;
        width: 100%;
        height: 100vh;
        box-sizing: border-box;
        align-items: center;
        justify-content: center;
        scroll-behavior: smooth;
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
        z-index: 5;
        background: var(--background-color);
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
        padding-top: calc(var(--header-height) + var(--medium-spacing));
        /*padding-bottom: var(--big-spacing);*/
    }

    h2.section {
        margin-bottom: var(--medium-spacing);
    }

    section#home {
        min-height: 100vh;
        padding: 0;
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

    .scroll-suggestion {
        position: fixed;
        bottom: var(--big-spacing);
        color: var(--gray);
        transition: .2s;
        transform: scale(1);
    }

    .scroll-suggestion p {
        animation: infinite ease-in-out 1.5s breathing;
    }

    .hidden {
        transition: .2s;
        transform: scale(0);
    }

    .container.landing {
        display: flex;
        align-items: center;
    }

    .project-grid {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        gap: var(--medium-spacing);
    }

    footer {
        display: flex;
        justify-content: center;
        border-top: var(--border);
        padding: var(--medium-spacing) 0;
    }

    .footer {
        display: flex;
        flex-direction: column;
        gap: 4px;
    }

    .footer p {
        font-size: .8rem;
    }

    :global(.project-grid:hover .card::after) {
        opacity: 1;
    }

    @keyframes breathing {
        0% {
            transform: translateY(0);
        }
        50% {
            transform: translateY(-5px);
        }
        100% {
            transform: translateY(0);
        }
    }
</style>
