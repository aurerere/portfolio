import {fileTreeTraveler, parseArgs, parsePath} from "@cli/core/utils";
import Cat from "@cli/components/Cat.svelte";

export default async function cat(args: string[]): Promise<CLI.BinOutput>
{
    try {
        const { regularArgs, options } = parseArgs(
            args,
            ["n", "b", "v", "t", "e", "A"],
            10,
            1
        );

        const toFetch = [];

        for (let i = 0; i < regularArgs.length; i++) {
            const to= parsePath(regularArgs[i]);
            const [,destType] = fileTreeTraveler(to);

            if (destType === "fileTree") {
                throw new Error("'" + regularArgs + "' is a directory")
            }

            toFetch.push(to);
        }

        let result: string | string[] = await Promise.all(toFetch.map(async path => {
            const res = await fetch("/files/" + path.join("/"));
            return res.text();
        }));

        result = result.join("\n");

        const n = options
            .findIndex(val => val.option === "n") !== -1;

        const b = options
            .findIndex(val => val.option === "b") !== -1;

        const v = options
            .findIndex(val => val.option === "v" || val.option === "A") !== -1;

        const t = options
            .findIndex(val => val.option === "t" || val.option === "A") !== -1;

        const e = options
            .findIndex(val => val.option === "e" || val.option === "A") !== -1;

        if (!n && !b && !v && !t && !e) {
            return result;
        }

        return {
            component: Cat,
            data: {
                result: result.split(/\r\n+/gm),
                n, b, v, t, e
            }
        }
    }
    catch (e) {
        switch ((e as Error).message) {
            case "Not a directory":
            case "No such file or directory":
                throw new Error("cat: " + args[0] + ": " + (e as Error).message);
            default:
                throw new Error("cat: " + (e as Error).message);
        }
    }
}
