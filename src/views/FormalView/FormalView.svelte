<script lang="ts">
import { Lang } from "../../stores/formal";
import Project from "./components/Project.svelte";
</script>

<main>
    <section>
        <div class="container">
            <h1>Test</h1>
            <h2>Test</h2>
            <h3>Test</h3>
            <h4>Test</h4>
            <h5>Test</h5>
            <p>Test</p>
        </div>
    </section>
</main>

<style>
    :root {
        --header-height: 48px;
        --big-spacing: 48px;
        --medium-spacing: 24px;
        --small-spacing: 12px;
        --micro-spacing: 6px;
    }

    body {
        font-size: 1rem;
    }

    h1 { font-size: 2rem }
    h2 { font-size: 1.8rem }
    h3 { font-size: 1.6rem }
    h4 { font-size: 1.4rem }
    h5 { font-size: 1.2rem }
    p { font-size: 1rem }

    h1, h2, h3, h4, h5 {
        outline: none;
        margin: 0 0 var(--small-spacing);
    }

    .no-margin {
        margin: 0;
    }

    .micro-margin-bottom {
        margin-bottom: var(--micro-spacing);
    }

    header {
        padding: 0 var(--big-spacing);
    }

    main {
        padding: 0 var(--big-spacing);
    }

    section {
        min-height: calc(100vh - var(--header-height));
        overflow: auto;
        display: flex;
        justify-content: center;
        padding-bottom: var(--big-spacing);
    }

    section.landing {
        min-height: 100vh;
        padding-bottom: 0;
    }

    .container {
        max-width: 1500px;
        width: 100%;
        box-sizing: border-box;
    }

    .flex {
        display: flex;
    }

    .space-between {
        justify-content: space-between;
    }

    .align-center {
        align-items: center;
    }

    .justify-center {
        justify-content: center;
    }
</style>
=======
    import { Lang } from "../../stores";

</script>
>>>>>>> c820d25a663b5f67b564046bb334b5e10de59574
