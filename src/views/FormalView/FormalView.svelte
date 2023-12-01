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
    import {faBars, faPaperPlane, faXmark} from "@fortawesome/free-solid-svg-icons";

    $: (document.querySelector(":root") as HTMLElement).style.setProperty("--header-height", headerHeight + "px");

    let loading: boolean = true;
    let data: Formal.Data;

    let focusedProject: Formal.Project | null = null;
    let projectCardsMousePosSetters: ((x: number, y: number) => void)[] = [];

    let headerHeight: number = 0;

    let menuWrapperEl: HTMLDivElement;
    let burgerButtonEl: HTMLButtonElement;

    let scrollY: number = 0;

    function scrollHook() {
        closeMobileMenu();
    }

    function scrollTo(to: string) {
        return () => {
            closeMobileMenu();
            document.getElementById(to)?.scrollIntoView(true);
        }
    }

    function handleMouseMoveOnProjectCards(e: Event)
    {
        for (const setPos of projectCardsMousePosSetters) {
            setPos((e as MouseEvent).clientX, (e as MouseEvent).clientY);
        }
    }

    function handleClick(e: Event)
    {
        if (menuWrapperEl.contains(e.target) || burgerButtonEl.contains(e.target))
            return;

        closeMobileMenu();
        // console.log(e.target);
        // if (e.target !== menuWrapperEl && !burgerButtonEl.contains(e.target as Element))
        //     closeMobileMenu();
    }

    function openProjectDetails(project: Formal.Project) {
        return () => {
            closeMobileMenu();
            focusedProject = project;
        }
    }

    function openMobileMenu()
    {
        menuWrapperEl.classList.add("opened");
        burgerButtonEl.classList.add("opened");
    }

    function closeMobileMenu()
    {
        menuWrapperEl.classList.remove("opened");
        burgerButtonEl.classList.remove("opened");
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

<svelte:window bind:scrollY={scrollY} on:scroll={scrollHook}/>
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
                <button class="burger opener" bind:this={burgerButtonEl} on:click={openMobileMenu}>
                    <Fa icon={faBars}/>
                </button>
            </div>
        </div>
    </header>
    <!-- svelte-ignore a11y-no-noninteractive-element-interactions a11y-click-events-have-key-events -->
    <main on:click={handleClick}>
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
                <form on:submit|preventDefault>
                    <input type="hidden" name="access_key" value="YOUR_ACCESS_KEY_HERE">

                    <label for="name">
                        Name
                        <input type="text" name="name" placeholder="John Doe" required />
                    </label>
                    <label for="email">
                        E-mail
                        <input type="email" name="email" placeholder="johndoe@example.com" required />
                    </label>
                    <label for="message">
                        Message
                        <textarea name="message" placeholder="Lorem ipsum" required rows="3"></textarea>
                    </label>
                    <button type="submit"><Fa icon={faPaperPlane}/> Send!</button>
                </form>
            </div>
        </section>
    </main>
    <footer>
        <div class="container footer">
            <p>{data.footer.love[$Lang]}</p>
            <p>
                <a href="https://github.com/aurerere/portfolio" target="_blank">
                    <Fa icon={faGithub}/>/aurerere/portfolio
                </a>
            </p>
        </div>
    </footer>
    <div class="menu-box-phone" bind:this={menuWrapperEl}>
        <div>
            <div class="menu-header" style="margin-bottom: var(--medium-spacing)">
                <h2 class="no-margin">Menu</h2>
                <button class="burger close" on:click={closeMobileMenu}><Fa icon={faXmark}/></button>
            </div>
            <Nav data={data.menu} {scrollTo} phoneVersion/>
        </div>
    </div>
    {#if focusedProject !== null}
        <ProjectDetails project={focusedProject} closedCallback={() => focusedProject = null}/>
    {/if}
{/if}

<style>
    @import "./FormalView.css" scoped;
</style>
