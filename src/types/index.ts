export type FileTree = {
    [key: string]: "file" | "executable" | "img" | FileTree
}

export type State = {
    fileTree: null | FileTree;
    history: Array<Command>,
    previousCmdStack: Array<string>,
    path: Array<string>,
    cleared: boolean,
}

export type Command = {
    path?: Array<string>,
    input?: string,
    result: Array<CommandResult>,
}

export type CommandResult = {
    component: string,
    content: any,
    more?: any
}

export type SimpleCommandResult = string;

export interface ClickEvent extends MouseEvent {
    target: HTMLElement;
}

export interface LsResult extends CommandResult {
    more: ExistsLsMore | InvalidPathLsMore | DoesNotExistsLsMore;
}

export type ExistsLsMore = {
    invalidPath: false,
    path: string[],
    isDir: boolean,
    exists: true,
    name: string | null,
    realPath: string,
    fileType: "any" | "executable" | "img" | null,
}

export type DoesNotExistsLsMore = {
    invalidPath: false,
    path: string[],
    isDir: false,
    exists: false,
    name: null,
    realPath: null,
    fileType: null,
}

export type InvalidPathLsMore = {
    invalidPath: true,
    path: null,
    isDir: null,
    exists: null,
    name: null,
    realPath: null,
    fileType: null,
}

export interface HelpResult extends CommandResult {
    component: "help",
    content: {
        [key: string]: {
            args: Array<string>,
            description: string,
        }
    }
}