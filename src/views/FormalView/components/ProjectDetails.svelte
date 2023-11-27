<script lang="ts">
    import {onDestroy, onMount} from "svelte";
    import {faXmark} from "@fortawesome/free-solid-svg-icons";
    import Fa from "svelte-fa";
    import {Lang} from "@stores";
    import {formatTimeLaps, getIconFromString} from "@utils/functions";
    import ProjectStatus from "./ProjectStatus.svelte";
    import ExternalLink from "@core-components/ExternalLink.svelte";
    import ProjectTag from "./ProjectTag.svelte";

    export let
        closedCallback: () => void,
        project: Formal.Project;

    let dialogEl: HTMLDialogElement;

    function close() {
        dialogEl.close();
        closedCallback();
    }

    function handleKeyDown (e: Event) {
        if ((e as KeyboardEvent).key === "Escape")
            close();
    }

    onMount(() => {
        console.log(project)
        dialogEl.showModal();
        document.body.style.overflow = "hidden";
    });

    onDestroy(() => {
        document.body.style.overflow = "auto";
    })
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog bind:this={dialogEl} on:click|self={() => close()} on:keydown={handleKeyDown}>
    <article>
        <button class="close" on:click={close}><Fa icon={faXmark}/></button>
        <header>
            <div class="heading">
                <ProjectStatus status={project.status}/>
                <h3 class="no-margin" style="margin-top: var(--small-spacing)">{project.name}</h3>
            </div>
            <p style="color: var(--gray)">{formatTimeLaps(project.dates, $Lang)}</p>
            <div class="tags">
                {#each project.tags as tag}
                    <ProjectTag tag={tag}/>
                {/each}
            </div>
        </header>
        <main>
            {project.description[$Lang]}
            <hr>
        </main>
        {#if project.links && project.links.length > 0}
            <footer>
                {#each project.links as link}
                    <ExternalLink to={link.url} icon={getIconFromString(link.icon)}>
                        {link.text[$Lang]}
                    </ExternalLink>
                {/each}
            </footer>
        {/if}
    </article>
</dialog>

<style>
    article {
        position: relative;
    }

    header {
        padding: var(--medium-spacing);
        border-bottom: var(--border);
    }

    main {
        padding: var(--medium-spacing);
        overflow-y: scroll;
    }

    footer {
        border-top: var(--border);
        padding: var(--medium-spacing);
    }

    .close {
        padding: 0;
        color: var(--dark-gray);
        border: none;
        background: none;
        position: absolute;
        top: var(--medium-spacing);
        right: var(--medium-spacing);
        transition: .2s;
    }

    .close:hover {
        color: var(--gray);
    }

    /*.heading {*/
    /*    display: flex;*/
    /*    align-items: baseline;*/
    /*    gap: var(--small-spacing);*/
    /*}*/

    .tags {
        margin-top: var(--small-spacing);
        display: flex;
        gap: 4px;
        flex-wrap: wrap;
    }

    dialog {
        outline: none;
        width: calc(100% - (2 * var(--big-spacing)));
        max-width: 1000px;
        border-radius: var(--border-radius);
        background: var(--background-color);
        border: var(--border);
        box-sizing: border-box;
        backdrop-filter: none;
        padding: 0;
    }

    dialog::backdrop {
        backdrop-filter: blur(5px);
        background: rgba(0, 0, 0, 0.3);
    }

    dialog[open] {
        animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    }

    dialog[open]::backdrop {
        animation: fade 0.2s ease-out;
    }

    @keyframes zoom {
        from {
            transform: scale(0.95);
        }
        to {
            transform: scale(1);
        }
    }

    @keyframes fade {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
</style>
