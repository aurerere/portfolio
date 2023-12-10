<script lang="ts">
    import {afterUpdate, onMount} from "svelte";

    import {Cleared, DeviceInfo, InputHistoryStack, ExecutionHistory, FileTree} from "@stores";
    import clear from "@cli/bin/clear";

    import WelcomeText from "./components/WelcomeText.svelte";
    import PromptText from "./components/PromptText.svelte";
    import OutputMapper from "./components/OutputMapper.svelte";
    import LoadingIndicator from "@core-components/LoadingIndicator.svelte";

    import run from "@cli/core/run";
    import {AURE_CLI_ASCII_ART} from "@utils/const";
    import {getSuggestions} from "@cli/utils/autocompletion";
    import PromptInput from "@views/CLIView/components/PromptInput.svelte"


    let loading: boolean = true;
    let focusPromptInput: () => void;
    let inputValue: string = "";

    async function runCommands(...commands: string[]) {
        loading = true;
        inputValue = "";

        if (commands.length > 1) {
            for (let i = 0; i < commands.length - 1; i++)
                await run(commands[i]);

            inputValue = commands[commands.length - 1];
        }
        else
            await run(commands[0])

        loading = false;
    }

    onMount(async () => {
        console.info("%c" + AURE_CLI_ASCII_ART, 'color: cyan');

        const res = await fetch("/fileTree.json");
        $FileTree = await res.json() as CLI.FileTree;
        loading = false;
    });

    afterUpdate(() => {
        window.scrollTo(0, document.body.scrollHeight);
    })
</script>

<!-- Workaround: Using HTML comments to prevent unwanted spaces -->
<main id="cli">
    {#if !$Cleared}
        <WelcomeText/>
    {/if}
    {#each $ExecutionHistory as previousElement}
        <div>
            <PromptText path={previousElement.path}/><!--
            --><span class="previous-input">{previousElement.input}</span>
            {#if previousElement.output}
                {#each previousElement.output as output, index (index)}
                    <OutputMapper {output}/>
                {/each}
            {/if}
        </div>
    {/each}
    {#if (loading)}
        <LoadingIndicator withMargin/>
    {:else}
        <!-- svelte-ignore a11y-no-static-element-interactions a11y-click-events-have-key-events -->
        <div class="prompt-wrapper" on:click={focusPromptInput}>
            <PromptText/><PromptInput {runCommands} bind:focus={focusPromptInput} value={inputValue}/>
        </div>
    {/if}
</main>

<style>
    main {
        padding: var(--medium-padding) var(--medium-padding) 0 var(--medium-padding);
        font-size: var(--text-font-size);
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        min-height: 100vh;
        overflow-x: hidden;
    }

    .prompt-wrapper {
        flex: 1;
        padding-bottom: var(--medium-spacing);
    }

    .previous-input {
        white-space: break-spaces;
    }
</style>
