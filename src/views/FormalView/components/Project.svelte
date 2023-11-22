<script lang="ts">
    import ProjectTag from "./ProjectTag.svelte";
    import ProjectStatus from "./ProjectStatus.svelte";

    import {Lang} from "@stores";
    import ExternalLink from "@core-components/ExternalLink.svelte";
    import {getIconFromString} from "@utils/functions";

    export let project: Formal.Project
</script>

<div class="wrapper">
    <div class="info">
        <div class="project-thumbnail">
            <img src={project.thumbnail} alt={project.name}>
        </div>
        <div class="content">
            <div class="title">
                <h3>{project.name}</h3>
                <ProjectStatus status={project.status}/>
            </div>

            <p>{project.description[$Lang]}</p>

            <div class="tags">
                {#each project.tags as tag}
                    <ProjectTag tag={tag}/>
                {/each}
            </div>
        </div>
        <div class="access">
            {#each project.links as link}
                <ExternalLink icon={getIconFromString(link.icon)} to={link.url}>
                    {link.text[$Lang]}
                </ExternalLink>
            {/each}
        </div>
    </div>
</div>

<style>
    .wrapper {
        border: var(--border);
        background: var(--very-dark-gray);
        padding: var(--medium-spacing);
        border-radius: var(--border-radius);
    }
</style>
