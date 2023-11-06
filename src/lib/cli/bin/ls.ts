import {fileTreeTraveler, parseArgs, parsePath} from "@cli/core/utils";
import Ls from "@cli/components/Ls.svelte";

type LsOutput = {
    result: { [key: string]: string | -1 },
    a: boolean,
    l: boolean
}

export default function ls(args: string[]): CLI.BinOutput<LsOutput>
{
    try {
        const parsedArgs = parseArgs(args, ["a", "l", "all"]);

        const relativePath = parsedArgs.regularArgs.length > 0 ? parsedArgs.regularArgs[0] : ".";

        const to= parsePath(relativePath);

        const dest = fileTreeTraveler(to);
        const result: { [key: string]: string | -1 } = {};

        if (typeof dest !== "string") {
            for (let [key, value] of Object.entries(dest)) {
                if (typeof value === "string")
                    result[key] = value;
                else
                    result[key] = -1;
            }

            const a = parsedArgs
                .options
                .findIndex(val => val.option === "a" || val.option === "all") !== -1;

            const l = parsedArgs
                .options
                .findIndex(val => val.option === "l") !== -1;

            return {
                component: Ls,
                data: { result, a, l }
            };
        }
        else {
            throw new Error("Not a directory");
        }
    }
    catch (e) {
        switch ((e as Error).message) {
            case "Not a directory":
            case "No such file or directory":
                throw new Error("ls: " + args[0] + ": " + (e as Error).message);
            default:
                throw new Error("ls: " + (e as Error).message);
        }
    }
}
