<script lang="ts">
    /*
    * Cards effect: https://www.youtube.com/watch?v=htGfnF1zN4g
    * */
    import ProjectTag from "./ProjectTag.svelte";
    import ProjectStatus from "./ProjectStatus.svelte";

    import {Lang} from "@stores";
    import {formatTimeLaps} from "@utils/functions";

    export let project: Formal.Project;
    export let openProjectDetails: (project: Formal.Project) => () => void;

    export function setMousePos(x: number, y: number)
    {
        const rect = cardEl.getBoundingClientRect();

        x = x - rect.left;
        y = y - rect.top;

        cardEl.style.setProperty("--mouse-x", `${x}px`);
        cardEl.style.setProperty("--mouse-y", `${y}px`);
    }

    let cardEl: HTMLDivElement;

    function handleKeyPress(e: Event) {
        if ((e as KeyboardEvent).key === " " || (e as KeyboardEvent).key === "Enter") {
            e.preventDefault();
            console.log("here")
            openProjectDetails(project)();
        }
    }
</script>

<div
    class="card"
    role="button"
    tabindex="0"
    bind:this={cardEl}
    on:click={openProjectDetails(project)}
    on:keypress={handleKeyPress}
>
    <div class="card-content">
        <div class="content">
            <div class="header">
                <div>
                    <h3 class="no-margin">{project.name}</h3>
                    <p style="color: var(--gray)">{formatTimeLaps(project.dates, $Lang)}</p>
                </div>
                <div>
                    <ProjectStatus status={project.status}/>
                </div>
            </div>

            <hr class="no-margin">

            <div class="main">
                <p>{project.description[$Lang]}</p>
                <div class="tags">
                    {#each project.tags as tag}
                        <ProjectTag tag={tag}/>
                    {/each}
                </div>
            </div>
        </div>
    </div>
</div>

<style>
    .card {
        cursor: pointer;
        position: relative;
        background: var(--dark-gray);
        padding: 2px;
        border-radius: var(--border-radius);
        display: flex;
        align-items: center;
        justify-content: center;
        outline: none;
    }

    .card:hover::before {
        opacity: 1;
    }

    .card::before,
    .card::after {
        border-radius: inherit;
        content: "";
        height: 100%;
        left: 0;
        opacity: 0;
        position: absolute;
        top: 0;
        transition: opacity 500ms;
        width: 100%;
    }

    .card::before {
        background: radial-gradient(
            800px circle at var(--mouse-x) var(--mouse-y),
            rgba(255, 255, 255, 0.06),
                transparent 40%
        );
        z-index: 3;
    }

    .card::after {
        background: radial-gradient(
            600px circle at var(--mouse-x) var(--mouse-y),
            rgba(255, 255, 255, 0.4),
            transparent 40%
        );
        z-index: 1;
    }

    .card-content {
        background-color: var(--very-dark-gray);
        border-radius: calc(var(--border-radius) - 2px);
        display: flex;
        flex-direction: column;
        inset: 2px;
        height: 100%;
        box-sizing: border-box;
        /*padding: var(--medium-spacing);*/
        z-index: 2;
    }

    .content {
        height: 100%;
        display: flex;
        flex-direction: column;
    }

    .header {
        display: flex;
        justify-content: space-between;
        gap: var(--micro-spacing);
        align-items: center;
        padding: var(--medium-spacing);
    }

    .main {
        padding: var(--medium-spacing);
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        gap: var(--medium-spacing);
        height: 100%;
    }

    .tags {
        display: flex;
        gap: 4px;
        flex-wrap: wrap;
    }
</style>
