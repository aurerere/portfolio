import Cat from "@cli/components/Cat.svelte";
import {createError, parseArgs, parsePath} from "@cli/utils/helpers";
import {fileTreeTraveler} from "@cli/utils/fileSystem";

export default async function cat(args: string[]): Promise<CLI.BinOutput>
{
    try {
        const { regularArgs, options } = parseArgs(
            args,
            ["n", "b", "v", "t", "e", "A"],
            10,
            1
        );

        const n = options.includesOneOf("n");
        const b = options.includesOneOf("b");
        const t = options.includesOneOf("t", "A");
        const e = options.includesOneOf("e", "A");

        const toFetch = [];

        for (let i = 0; i < regularArgs.length; i++) {
            const to= parsePath(regularArgs[i]);
            const [,destType] = fileTreeTraveler(to);

            if (destType === "fileTree") {
                createError("'" + regularArgs[i] + "' is a directory");
            }

            toFetch.push(to);
        }

        let result: string | string[] = await Promise.all(
            toFetch.map(async path => {
                const res = await fetch("/files/" + path.join("/"));
                return res.text();
            })
        );

        result = result.join("\r\n");

        return {
            component: Cat,
            data: {
                result: result.split(/\n/gm),
                n, b, t, e
            }
        };
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
