export type FileTree = {
    [key: string]: "file" | "app" | FileTree
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