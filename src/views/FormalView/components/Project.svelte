<script lang="ts">
    import ProjectTag from "./ProjectTag.svelte";
    import ProjectStatus from "./ProjectStatus.svelte";
    import ProjectLink from "./ProjectLink.svelte";

    import {Lang} from "../../../stores/general";

    export let thumbnail: Formal.Project["thumbnail"];
    export let name: Formal.Project["name"];
    export let description: Formal.Project["description"];
    export let tags: Formal.Project["tags"];
    export let done: Formal.Project["done"];
    export let links: Formal.Project["links"];
</script>

<div class="wrapper">
    <div class="info">
        <div class="project-thumbnail">
            <img src={thumbnail} alt={name[$Lang]}>
        </div>
        <div class="content">
            <div class="title">
                <h3>{name[$Lang]}</h3>
                <ProjectStatus done={done}/>
            </div>

            <p>{description[$Lang]}</p>

            <div class="tags">
                {#each tags as tag}
                    <ProjectTag tag={tag}/>
                {/each}
            </div>
        </div>
        <div class="access">
            {#each links as link}
                <ProjectLink url={link.url} icon={link.icon} text={link.text[$Lang]}/>
            {/each}
        </div>
    </div>
</div>
