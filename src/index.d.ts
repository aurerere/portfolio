declare module '*.svelte' {
    export { SvelteComponent as default };
}

namespace Core {
    type DeviceInfo = {
        keyboard: "default" | "apple";
        device: "desktop" | "mobile";
    }
}

namespace Formal {
    type LanguageSensitiveString = {
        en: string;
        fr: string;
    };

    type Lang = "fr" | "en";

    type Link = {
        url: string;
        icon: string;
        text: LanguageSensitiveString;
    };

    type Project = {
        name: LanguageSensitiveString;
        thumbnail: string;
        description: LanguageSensitiveString;
        tags: string[];
        done: boolean;
        links: Link[];
    };
}

namespace CLI {
    type FileTree = {
        [key: string]: string | FileTree
    }

    type BinOutput = string | ComponentDependentBinOutput;

    type ComponentDependentBinOutput = {
        component: typeof import("svelte").SvelteComponent<any>;
        data: {
            [key: string]: any
        };
    }

    type HistoryElement = {
        path: string[];
        input: string,
        output: BinOutput[],
        cancelled: boolean;
    }

    type Operator = ";" | "||";

    type ParsedArgs = {
        regularArgs: string[],
        options: Array<{
            option: string,
            potentialValue: string
        }>
    }
}
