<script lang="ts">
    import Fa from "svelte-fa";
    import {Lang} from "@stores";
    import type {IconDefinition} from "@fortawesome/fontawesome-common-types";
    import {faCheck, faEllipsis, faFaceSadTear, faPause} from "@fortawesome/free-solid-svg-icons";

    const statusText: Record<Formal.Project["status"], Formal.LanguageSensitiveString> = {
        ongoing: {
            fr: "En cours",
            en: "Ongoing"
        },
        done: {
            fr: "Fini",
            en: "Done"
        },
        paused: {
            fr: "En pause",
            en: "Paused"
        },
        aborted: {
            fr: "Abandonné",
            en: "Aborted"
        }
    }

    const statusIcon: Record<Formal.Project["status"], IconDefinition> = {
        ongoing: faEllipsis,
        done: faCheck,
        paused: faPause,
        aborted: faFaceSadTear
    }

    export let status: Formal.Project["status"];
</script>

<span>
    <Fa icon={statusIcon[status]}/> {statusText[status][$Lang]}
</span>


<style>
    span {
        width: fit-content;
        color: var(--gray);
    }
</style>
