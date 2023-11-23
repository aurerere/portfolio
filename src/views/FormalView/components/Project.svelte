<script lang="ts">
    /*
    * Cards effect: https://www.youtube.com/watch?v=htGfnF1zN4g
    * */
    import ProjectTag from "./ProjectTag.svelte";
    import ProjectStatus from "./ProjectStatus.svelte";

    import {Lang} from "@stores";
    import ExternalLink from "@core-components/ExternalLink.svelte";
    import {getIconFromString} from "@utils/functions";
    import {MONTH_NAMES_SHORT_EN, MONTH_NAMES_SHORT_FR} from "@utils/const";

    export let project: Formal.Project;

    export function setMousePos(x: number, y: number)
    {
        const rect = cardEl.getBoundingClientRect();

        x = x - rect.left;
        y = y - rect.top;

        cardEl.style.setProperty("--mouse-x", `${x}px`);
        cardEl.style.setProperty("--mouse-y", `${y}px`);
    }

    let cardEl: HTMLDivElement;

    function formatDate(dates: [string, string?], lang: Formal.Lang): string
    {
        let mns = lang === "fr" ? MONTH_NAMES_SHORT_FR : MONTH_NAMES_SHORT_EN;

        const from = new Date(dates[0]);

        if (dates[1]) {
            const to = new Date(dates[1]);

            return `${mns[from.getMonth()]} ${from.getFullYear()} → ${mns[to.getMonth()]} ${to.getFullYear()}`
        }
        else {
            return `${lang === "fr" ? "Depuis" : "Since"} ${mns[from.getMonth()]} ${from.getFullYear()}`;
        }
    }
</script>

<div class="card" bind:this={cardEl}>
    <div class="card-content">
        <div class="content">
            <div class="header">
                <div>
                    <h3 class="no-margin">{project.name}</h3>
                    <p style="color: var(--gray)">{formatDate(project.dates, $Lang)}</p>
                </div>
                <div>
                    <ProjectStatus status={project.status}/>
                </div>
            </div>

            <hr style="margin: 0; border: 1px solid var(--dark-gray)">

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
