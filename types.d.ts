type ParsedArgs = [string[], string[]];

type FileTree = {
    [key: string]: "any" | "executable" | "img" | "doc" | FileTree
}

type FileTreeTravelerResult = {};

type State = {
    fileTree: null | FileTree;
    history: Array<Command>,
    previousCmdStack: Array<string>,
    path: Array<string>,
    cleared: boolean,
}

type Command = {
    path?: Array<string>,
    input?: string,
    result: Array<CommandResult>,
}

type CommandResult = {
    component: string,
    content: any,
    more?: any
}

type SimpleCommandResult = string;

interface ClickEvent extends MouseEvent {
    target: HTMLElement;
}

interface LsResult extends CommandResult {
    more: ExistsLsMore | InvalidPathLsMore | DoesNotExistsLsMore;
}

type ExistsLsMore = {
    invalidPath: false,
    path: string[],
    isDir: boolean,
    exists: true,
    name: string | null,
    realPath: string,
    fileType: "any" | "executable" | "img" | null,
}

type DoesNotExistsLsMore = {
    invalidPath: false,
    path: string[],
    isDir: false,
    exists: false,
    name: null,
    realPath: null,
    fileType: null,
}

type InvalidPathLsMore = {
    invalidPath: true,
    path: null,
    isDir: null,
    exists: null,
    name: null,
    realPath: null,
    fileType: null,
}

interface HelpResult extends CommandResult {
    component: "help",
    content: {
        [key: string]: {
            args: Array<string>,
            description: string,
        }
    }
}

type LanguageSensitiveString = {fr: string, en: string};

type ProjectLink = {
    en: string,
    fr: string,
    icon: string,
    url: string,
}

type Project = {
    name: string,
    done: boolean,
    desc: LanguageSensitiveString,
    thumbnail: string,
    tags: string[],
    links: ProjectLink[],
}

export type Content = {
    menu: {
        presentation: LanguageSensitiveString,
        projects: LanguageSensitiveString,
        contact: LanguageSensitiveString,
        nerd: LanguageSensitiveString,
    },
    presentation: {
        cv_btn: LanguageSensitiveString,
        cv_url: LanguageSensitiveString,
        title: LanguageSensitiveString,
        subtitle: LanguageSensitiveString,
    },
    contact: {
        linkedin: LanguageSensitiveString,
        mail: LanguageSensitiveString,
        phone: LanguageSensitiveString,
    },
    footer: {
        cookies: LanguageSensitiveString,
        credits: LanguageSensitiveString,
    },
    projects: Project[]
}