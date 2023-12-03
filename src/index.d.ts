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
    type Lang = "fr" | "en";

    type LanguageSensitiveString = Record<Lang, string>;

    type Link = {
        url: string,
        icon: string,
        text: LanguageSensitiveString,
    };

    type LanguageSensitiveLink = {
        icon: string
    } & Record<Lang, {
        url: string,
        text: string
    }>

    type Project = {
        name: string,
        status: "done" | "paused" | "ongoing" | "aborted",
        inProd: boolean,
        dates: [string, string?],
        thumbnail: string,
        description: LanguageSensitiveString,
        tags: string[],
        done: boolean,
        links: Link[],
        slug: string
    };

    type Data = {
        title: string,
        menu: {
            landing: LanguageSensitiveString,
            projects: LanguageSensitiveString,
            contact: LanguageSensitiveString,
            cli: LanguageSensitiveString
        },
        landing: {
            heading: LanguageSensitiveString,
            paragraph: LanguageSensitiveString,
            links: LanguageSensitiveLink[]
        },
        projects: Project[],
        contact: {
            text: LanguageSensitiveString,
            links: Link[],
            form_fields: {
                name: LanguageSensitiveString,
                email: LanguageSensitiveString,
                message: LanguageSensitiveString,
                send: LanguageSensitiveString,
                thanks: LanguageSensitiveString,
            },
        },
        footer: {
            love: LanguageSensitiveString
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
