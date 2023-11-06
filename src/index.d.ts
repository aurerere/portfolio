declare module '*.svelte' {
    export { SvelteComponent as default };
}

namespace Core {
    type DeviceInfo = {
        keyboard: "default" | "apple",
        device: "desktop" | "mobile",
    }
}

namespace Formal {
    type LanguageSensitiveString = {
        en: string,
        fr: string,
    };

    type Lang = "fr" | "en";

    type Link = {
        url: string,
        icon: string,
        text: LanguageSensitiveString,
    };

    type Project = {
        name: LanguageSensitiveString,
        thumbnail: string,
        description: LanguageSensitiveString,
        tags: string[],
        done: boolean,
        links: Link[],
    };
}

namespace CLI {
    type FileTree = {
        [key: string]: string | FileTree
    }

    type BinOutput<T = { [key: string]: any }> = string | ComponentDependentBinOutput<T>;

    type ComponentDependentBinOutput<T> = {
        component: typeof import("svelte").SvelteComponent<any>,
        data: T,
    }

    type HistoryElement = {
        path: string[],
        input: string,
        output: BinOutput[],
        cancelled: boolean,
    }

    type Operator = ";" | "||";

    type ParsedArgs = {
        regularArgs: string[],
        options: Array<{
            option: string,
            potentialValue: string | null
        }>
    }
}
