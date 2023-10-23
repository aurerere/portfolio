namespace Core {
    type Alternating<T extends readonly any[], A, B> =
        T extends readonly [] ? T
            : T extends readonly [A] ? T
                : T extends readonly [A, B, ...infer T2]
                    ? T2 extends Alternating<T2, A, B> ? T : never
                    : never

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

    type HistoryElement = {
        path: string[];
        command: Command;
        cancelled: boolean;
    }

    type BinInput = {
        args: string[];
        flags: Array<{
            value: string,
            followedBy: string | null
        }>;
    }

    type Command = {
        input: string;
        output: BinOutput[];
    }

    type BinOutput = string | ComponentDependentBinOutput;

    type ComponentDependentBinOutput = {
        component: string;
        data: {
            [key: string]: any
        };
    }
}
