export function parseArgs(args: string[]): CLI.ParsedArgs
{
    let options: CLI.ParsedArgs["options"] = [];
    let regularArgs: CLI.ParsedArgs["regularArgs"] = [];

    for (let i = 0; i < args.length; i++) {
        if (args[i].startsWith("--")) {

        }
        else if (args[i].startsWith("-")) {

        }
        else {

        }
    }

    return { options, regularArgs };
}