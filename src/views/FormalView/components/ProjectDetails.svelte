<script lang="ts">
    import {onDestroy, onMount} from "svelte";
    import {faXmark} from "@fortawesome/free-solid-svg-icons";
    import Fa from "svelte-fa";
    import {Lang} from "@stores";
    import {formatTimeLaps, getIconFromString} from "@utils/misc";
    import ProjectStatus from "./ProjectStatus.svelte";
    import ExternalLink from "@views/FormalView/components/ExternalLink.svelte";
    import ProjectTag from "./ProjectTag.svelte";
    import LoadingIndicator from "@core-components/LoadingIndicator.svelte";
    import {marked} from "marked";

    export let
        closedCallback: () => void,
        project: Formal.Project;

    let dialogEl: HTMLDialogElement;
    let loading: boolean = true;
    let parsedMarkdown: null | string = null;

    function close() {
        dialogEl.close();
        closedCallback();
    }

    function handleKeyDown (e: Event) {
        if ((e as KeyboardEvent).key === "Escape")
            close();
    }

    onMount(() => {
        dialogEl.showModal();
        document.body.style.overflowY = "hidden";

        fetch(`files/projects/${project.slug}/${$Lang}.md`)
            .then(res => res.text())
            .then(async text => {
                console.log(text)
                const renderer = new marked.Renderer();

                renderer.image = function (href, _, text) {
                    return `<img src="files/projects/${project.slug}/${href}" alt="${text}"/>`
                }

                renderer.link = function(href, _, text)  {
                    return `<a href="${href}" target="_blank">${text}</a>`
                }

                parsedMarkdown = await marked(text, {renderer});

                loading = false;
            });
    });

    onDestroy(() => {
        document.body.style.overflowY = "auto";
    });
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog bind:this={dialogEl} on:click|self={() => close()} on:keydown={handleKeyDown}>
    <article>
        <button class="close" on:click={close} aria-label="close"><Fa icon={faXmark}/></button>
        <div class="header">
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
        </div>
        <div class="main md">
            {#if loading}
                <div class="loading">
                    <LoadingIndicator/>
                </div>
            {:else}
                {@html parsedMarkdown}
            {/if}
        </div>
        {#if project.links && project.links.length > 0}
            <div class="footer">
                {#each project.links as link}
                    <ExternalLink to={link.url} icon={getIconFromString(link.icon)}>
                        {link.text[$Lang]}
                    </ExternalLink>
                {/each}
            </div>
        {/if}
    </article>
</dialog>

<style>
    dialog {
        overflow-y: hidden;
        height: 100%;
    }

    article {
        position: relative;
        display: flex;
        height: 100%;
        flex-direction: column;
        justify-content: space-between;
    }

    .header {
        padding: var(--medium-padding);
        border-bottom: var(--border);
    }

    .main {
        padding: var(--medium-padding);
        overflow-y: scroll;
        flex: 1;
    }

    .main::-webkit-scrollbar {
        width: 4px;
        height: 4px;
    }

    .loading {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    :global(.main img) {
        max-width: 100%;
    }

    .footer {
        border-top: var(--border);
        padding: var(--medium-padding);
        flex: 0;
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

    .close:hover, .close:focus {
        color: var(--gray);
    }

    .tags {
        margin-top: var(--small-spacing);
        display: flex;
        gap: 4px;
        flex-wrap: wrap;
    }

    dialog {
        outline: none;
        width: calc(100% - (2 * var(--global-padding)));
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
        -webkit-backdrop-filter: blur(5px);
        background: rgba(0, 0, 0, 0.3);
    }

    dialog[open] {
        animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    }

    dialog[open]::backdrop {
        animation: fade 0.2s ease-out;
    }

    @media (max-width: 600px) {
        .close {
            top: var(--small-spacing);
            right: var(--small-spacing);
        }

        .tags {
            display: none;
        }
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
