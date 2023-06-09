<script lang="ts">
    import { Lang } from "../stores";

    let lang: "fr" | "en" = "fr";

    Lang.subscribe(value => lang = value);
</script>
