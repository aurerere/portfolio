<script lang="ts">
    import {onDestroy, onMount} from "svelte";
    import {slide} from "svelte/transition";

    import {getIconFromString} from "@utils/functions";
    import {Lang} from "@stores";

    import ExternalLink from "@core-components/ExternalLink.svelte";
    import LoadingIndicator from "@core-components/LoadingIndicator.svelte";
    import Nav from "./components/Nav.svelte";
    import {faGithub} from "@fortawesome/free-brands-svg-icons";
    import Fa from "svelte-fa";
    import Project from "./components/Project.svelte";
    import ProjectDetails from "./components/ProjectDetails.svelte";
    import {faBars, faXmark} from "@fortawesome/free-solid-svg-icons";

    $: (document.querySelector(":root") as HTMLElement).style.setProperty("--header-height", headerHeight + "px");
    // $: scrollHook(scrollY);

    let loading: boolean = true;
    let data: Formal.Data;

    let focusedProject: Formal.Project | null = null;

    let headerHeight: number = 0;
    let scrollY: number = 0;

    let phoneMenuDialogEl: HTMLDialogElement;

    function scrollTo(to: string) {
        return () => {
            document.getElementById(to)?.scrollIntoView(true);
        }
    }

    // function scrollHook(scrollVal: number) {
    //
    // }

    let projectCardsMousePosSetters: ((x: number, y: number) => void)[] = [];

    function handleMouseMoveOnProjectCards(e: Event)
    {
        for (const setPos of projectCardsMousePosSetters) {
            setPos((e as MouseEvent).clientX, (e as MouseEvent).clientY);
        }
    }

    function openProjectDetails(project: Formal.Project) {
        return () => {
            focusedProject = project;
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
            <a class="no-style" href="#home" on:click|preventDefault={scrollTo("home")}>
                <h1 class="no-margin">{data.title}</h1>
            </a>
            <div class="menu-desktop">
                <Nav data={data.menu} {scrollTo}/>
            </div>
            <div class="menu-phone">
                <button class="burger" on:click={() => phoneMenuDialogEl.showModal()}><Fa icon={faBars}/></button>
            </div>
        </div>
    </header>
    <main>
        <section id="home">
            <div class="container landing">
                <div class="part">
                    <img src="/hello.png" alt="hello!" class="avatar"/>
                </div>
                <div class="part">
                    <h2 class="hello">{data.landing.heading[$Lang]}</h2>
                    <p>{data.landing.paragraph[$Lang]}</p>
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
                        <Project {project} {openProjectDetails} bind:setMousePos={projectCardsMousePosSetters[index]}/>
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
    <dialog bind:this={phoneMenuDialogEl} class="menu-box-phone">
        <div>
            <div class="menu-header" style="margin-bottom: var(--medium-spacing)">
                <h2 class="no-margin">Menu</h2>
                <button class="burger" on:click={() => phoneMenuDialogEl.close()}><Fa icon={faXmark}/></button>
            </div>
            <Nav data={data.menu} {scrollTo} phoneVersion/>
        </div>
    </dialog>
    {#if focusedProject !== null}
        <ProjectDetails project={focusedProject} closedCallback={() => focusedProject = null}/>
    {/if}
{/if}

<style>
    main.loading {
        display: flex;
        width: 100vw;
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
        padding: var(--medium-padding) 0;
        position: fixed;
        width: 100vw;
        top: 0;
        left: 0;
        z-index: 5;
        background: rgb(30,31,34);
        background: linear-gradient(0deg, rgba(30,31,34,0.9) 0%, rgba(30,31,34,1) 80%);
        /*backdrop-filter: blur(30px);*/
    }

    .nav-bar {
        display: flex;
        align-items: center;
        gap: var(--medium-spacing);
        justify-content: space-between;
    }

    .menu-phone {
        display: none;
    }

    dialog {
        margin-top: 0;
        margin-right: 0;
        padding: calc(var(--medium-spacing) - var(--border-width)) var(--small-spacing);
        background: var(--background-color);
        border-radius: var(--border-radius);
        border: var(--border)
    }

    dialog[open] {
        animation: scaleUp .2s ease-in-out;
    }

    dialog::backdrop {
        backdrop-filter: blur(5px);
        -webkit-backdrop-filter: blur(5px);
        background: rgba(0, 0, 0, 0.3);
    }


    .menu-header {
        display: flex;
        justify-content: space-between;
    }

    section {
        min-height: calc(100vh - var(--header-height));
        overflow: auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-top: calc(var(--header-height) + var(--medium-spacing));
        overflow-x: hidden;
        /*padding-bottom: var(--big-spacing);*/
    }

    h2.section {
        margin-bottom: var(--medium-spacing);
    }

    h2.hello {
        font-size: calc(var(--h1-font-size) + 1rem);
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
        width: 100vw;
        padding: 0 var(--global-padding);
        box-sizing: border-box;
    }

    .scroll-suggestion {
        position: fixed;
        bottom: var(--medium-spacing);
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
        gap: var(--medium-spacing);
    }

    .project-grid {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-auto-rows: 1fr;
        gap: var(--medium-spacing);
    }

    footer {
        display: flex;
        justify-content: center;
        border-top: var(--border);
        padding: var(--medium-padding) 0;
    }

    .footer {
        display: flex;
        flex-direction: column;
        gap: 4px;
    }

    .footer p {
        font-size: calc(var(--text-font-size) - .2rem);
    }

    .burger {
        padding: 0;
        border: none;
        background: none;
        font-size: var(--h2-font-size);
        color: var(--muted-text-color);
    }

    :global(.project-grid:hover .card::after) {
        opacity: 1;
    }

    @media (max-width: 1200px) {
        .project-grid {
            grid-template-columns: 1fr 1fr;
        }
    }

    @media (max-width: 1090px) {
        .menu-desktop {
            display: none;
        }

        .menu-phone {
            display: block;
        }
    }

    @media (max-width: 900px) {
        /*:global(html) {*/
        /*    font-size: .9em;*/
        /*}*/

        .project-grid {
            grid-template-columns: 1fr;
        }
    }

    @media (max-width: 600px) {
        h1 {
            font-size: var(--h2-font-size);
        }

        h2.hello {
            font-size: var(--h2-font-size);
        }

        .container.landing {
            flex-direction: column;
            align-items: flex-start;
        }

        :global(:root) {
            --global-padding: var(--small-spacing);
            /*--medium-spacing: 12px;*/
            --medium-padding: var(--medium-spacing) var(--small-spacing);
        }

        header {
            padding: var(--medium-spacing) 0;
        }

        footer {
            padding: var(--medium-spacing) 0;
        }

        .project-grid {
            gap: 12px;
        }

        .avatar {
            display: none;
        }
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

    @keyframes scaleUp {
        0% {
             transform: scale(0);
        }
        100% {
            margin-top: 0;
            margin-right: 0;
            transform: scale(1);
        }
    }
</style>
