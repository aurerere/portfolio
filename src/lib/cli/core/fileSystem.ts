import {CurrentPath, FileTree} from "@stores";

export function fileTreeTraveler(path: string[]): CLI.FileTree | string
{
    let element: CLI.FileTree = {};
    // Just to assign element with the current FileTree value in the store
    const unsubscribe = FileTree.subscribe(
        value => element = value !== null ? value : element
    );
    unsubscribe();

    for (let i = 0; i < path.length; i++) {
        if (typeof element[path[i]] === "object") {
            element = element[path[i]] as CLI.FileTree;
            continue;
        }
        if (element[path[i]] && i === path.length - 1)
            return element[path[i]];
        else if (element[path[i]])
            throw new Error("Not a directory");
        else
            throw new Error("No such file or directory");
    }

    return element;
}

export function parsePath(relativePath: string): string[]
{
    relativePath = relativePath.replace("/home/aureliendumay.me", "~");

    if (relativePath.startsWith("/"))
        throw new Error("Permission denied");

    const relativePathSplit = relativePath.split("/");
    let path: string[] = [];
    // Just to assign path with the current CurrentPath value in the store
    const unsubscribe = CurrentPath.subscribe(value => path = value);
    unsubscribe();

    if (relativePathSplit[0] === "~")
        return relativePathSplit;

    else {
        for (let i = 0; i < relativePathSplit.length; i++) {
            switch (relativePathSplit[i]) {
                case "..":
                    if (path.length > 1)
                        path.pop();
                    else
                        throw new Error("Permission denied");
                    break;
                case ".":
                    break;
                default:
                    if (!relativePathSplit[i])
                        break;
                    path.push(relativePathSplit[i])
            }
        }
    }

    return path;
}