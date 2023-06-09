<script lang="ts">
    import ProjectTag from "./ProjectTag.svelte";
    import ProjectStatus from "./ProjectStatus.svelte";
    import ProjectLink from "./ProjectLink.svelte";

    type Link = {
        url: string;
        icon: string;
        text: { fr: string, en: string };
    }

    let thumbnail: string;
    let name: string;
    let description: string;
    let tags: string[];
    let done: boolean;
    let links: Link[];
</script>

<div class="wrapper">
    <div class="info">
        <div class="project-thumbnail">
            <img src={thumbnail} alt={name}>
        </div>
        <div class="content">
            <div class="title">
                <h3>{name}</h3>
                <ProjectStatus done={done}/>
            </div>

            <p>{description}</p>

            <div class="tags">
                {#each tags as tag}
                    <ProjectTag tag={tag}/>
                {/each}
            </div>
        </div>
        <div class="access">
            {#each links as link}
                <ProjectLink url={link.url} icon={link.icon} text={link.text}/>
            {/each}
        </div>
    </div>
</div>
