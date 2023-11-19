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

    type LanguageSensitiveLink = {
        icon: string,
        fr: {
            url: string,
            text: string
        },
        en: {
            url: string,
            text: string
        }
    }

    type Project = {
        name: string,
        status: "done" | "paused" | "in development" | "aborted",
        inProd: boolean,
        dates: [string, string],
        thumbnail: string,
        description: LanguageSensitiveString,
        tags: string[],
        done: boolean,
        links: Link[],
    };

    type Menu = {
        landing: LanguageSensitiveString,
        projects: LanguageSensitiveString,
        contact: LanguageSensitiveString,
        cli: LanguageSensitiveString
    }

    type Data = {
        menu: Menu,
        landing: {
            title: LanguageSensitiveString,
            p: LanguageSensitiveString,
            buttons: LanguageSensitiveLink[]
        }
    }
}

namespace CLI {
    type FileTree = {
        [key: string]: File | Folder
    };

    type Folder = {
        type: "folder",
        role: "folder",
        hidden: boolean,
        children: FileTree,
        blksize: number,
        nlink: number,
        mtime: Date
    }

    type File = {
        type: "file",
        role: string,
        hidden: boolean,
        blksize: number,
        nlink: number,
        mtime?: Date | string
    }

    type FolderMetadata = {
        type: "folder",
        role: "folder",
        hidden: boolean,
        blksize: number,
        nlink: number,
        mtime?: Date | string
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
