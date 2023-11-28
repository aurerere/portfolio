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

    function openMobileMenu()
    {

    }

    function closeMobileMenu()
    {

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
    @import "./FormalView.css" scoped;
</style>
