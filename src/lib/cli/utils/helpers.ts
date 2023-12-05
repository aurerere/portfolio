import {CurrentPath} from "@stores";

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


class Options implements CLI.IOptions {
    private readonly options: CLI.BinOption[];

    constructor() {
        this.options = [];
    }

    get value() {
        return this.options;
    }

    public add(value: string, potentialValue: string | null = null) {
        this.options.push({value, potentialArgument: potentialValue});
    }

    public includesOneOf(...values: string[]): boolean {
        return this
            .options
            .findIndex(option => values.includes(option.value)) !== -1;
    }
}

export function parseArgs(
    args: string[],
    expectedOptions?: string[],
    expectedMaxNumberOfArguments?: number,
    expectedMinNumberOfArguments?: number
): CLI.ParsedArgs {
    const options = new Options();
    const regularArgs: CLI.ParsedArgs["regularArgs"] = [];

    for (let i = 0; i < args.length; i++) {
        if (args[i].startsWith("--")) {
            if (expectedOptions && !expectedOptions.includes(args[i].substring(2)))
                throw new Error("Invalid option '" + args[i] + "'");

            if (args[i].substring(2).length === 1)
                throw new Error("option '" + args[i] + "' is ambiguous");

            options.add(
                args[i].substring(2),
                args[i + 1] && args[i + 1].startsWith("-") ? null : args[i + 1]
            );
        }
        else if (args[i].startsWith("-")) {
            if (args[i] === "-")
                throw new Error("Invalid option '-'");

            const fragmentedOptions = args[i].substring(1).split("");

            for (let j = 0; j < fragmentedOptions.length; j++) {
                if (expectedOptions && !expectedOptions.includes(fragmentedOptions[j]))
                    throw new Error("Invalid option '-" + fragmentedOptions[j] + "'");

                options.add(
                    fragmentedOptions[j],
                    fragmentedOptions.length - 1 && args[i + 1] && !args[i + 1].startsWith("-")
                        ? args[i + 1]
                        : null
                );
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


export function createError(message: string): CLI.BinOutput
{
    throw new Error(message);
}
