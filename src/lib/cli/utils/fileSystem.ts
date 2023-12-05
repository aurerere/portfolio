import {FileTree} from "@stores";
import {createError, parsePath} from "@cli/utils/helpers";

export function fileTreeTraveler(path: string[]): [CLI.File, "file"] | [CLI.FileTree, "fileTree"]
{
    let element: CLI.FileTree | null = null;
    // Just to assign element with the current FileTree value in the store
    const unsubscribe = FileTree.subscribe(
        value => element = value !== null ? {...value} : element
    );
    unsubscribe();


    if (element === null)
        throw new Error("Internal");

    for (let i = 0; i < path.length; i++) {
        if (element[path[i]] === undefined)
            throw new Error(path[i] + ": No such file or directory");
        else if (element[path[i]].type === "folder")
            element = (element[path[i]] as CLI.Folder).children;
        else if (i === path.length - 1)
            return [element[path[i]] as CLI.File, "file"];
        else
            throw new Error(path[i] + ": Not a directory");
    }

    return [element, "fileTree"];
}


export async function executeFromFile(path: string, args: string[]): Promise<CLI.BinOutput>
{
    try {
        const to= parsePath(path);
        const [dest, destType] = fileTreeTraveler(to);

        if (destType === "fileTree" || dest.role !== "bin")
            createError("not found");

        const res = await fetch("/files/" + to.join("/"));

        const sourceCode = "{return " + await res.text() + "}";

        const func = new Function(sourceCode);
        const out = func.call(null).call(args);

        return out === undefined ? "" : out;
    }
    catch (e) {
        throw new Error(path + ": not found");
    }
}