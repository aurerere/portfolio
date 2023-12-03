import {CurrentPath, FileTree} from "@stores";

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

export function parsePath(relativePath: string): string[]
{
    relativePath = relativePath.replace("/home/aureliendumay.me", "~");

    if (relativePath.startsWith("/"))
        throw new Error("Permission denied");

    const relativePathSplit = relativePath.split("/");
    let path: string[] = [];
    // Just to assign path with the current CurrentPath value in the store
    const unsubscribe = CurrentPath.subscribe(value => path = [...value]);
    unsubscribe();

    if (relativePathSplit[0] === "~") {
        relativePathSplit.shift();
        return relativePathSplit;
    }
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

    path.shift();
    return path;
}

export function parseArgs(
    args: string[],
    expectedOptions?: string[],
    expectedMaxNumberOfArguments?: number,
    expectedMinNumberOfArguments?: number
): CLI.ParsedArgs {
    const options: CLI.ParsedArgs["options"] = [];
    const regularArgs: CLI.ParsedArgs["regularArgs"] = [];

    for (let i = 0; i < args.length; i++) {
        if (args[i].startsWith("--")) {
            if (expectedOptions && !expectedOptions.includes(args[i].substring(2)))
                throw new Error("Invalid option '" + args[i] + "'");

            if (args[i].substring(2).length === 1)
                throw new Error("option '" + args[i] + "' is ambiguous");

            options.push({
                option: args[i].substring(2),
                potentialValue: args[i + 1] && args[i + 1].startsWith("-") ? null : args[i + 1]
            });
        }
        else if (args[i].startsWith("-")) {
            if (args[i] === "-")
                throw new Error("Invalid option '-'");

            const fragmentedOptions = args[i].substring(1).split("");

            for (let j = 0; j < fragmentedOptions.length; j++) {
                if (expectedOptions && !expectedOptions.includes(fragmentedOptions[j]))
                    throw new Error("Invalid option '-" + fragmentedOptions[j] + "'");

                options.push({
                    option: fragmentedOptions[j],
                    potentialValue: j === fragmentedOptions.length - 1 && args[i + 1] && !args[i + 1].startsWith("-")
                        ? args[i + 1]
                        : null
                });
            }
        }
        else {
            if (expectedMaxNumberOfArguments && regularArgs.length + 1 > expectedMaxNumberOfArguments)
                throw new Error("To many arguments");

            regularArgs.push(args[i]);
        }
    }

    if (expectedMinNumberOfArguments && expectedMinNumberOfArguments > regularArgs.length)
        throw new Error("At least " + expectedMinNumberOfArguments + " argument(s) expected")

    return { options, regularArgs };
}

export async function exe(path: string, args: string[]): Promise<CLI.BinOutput>
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

export function createError(message: string): CLI.BinOutput
{
    throw new Error(message);
}
