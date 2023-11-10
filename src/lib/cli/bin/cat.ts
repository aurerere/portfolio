import {parseArgs} from "@cli/core/utils";

export default async function cat(args: string[]): Promise<CLI.BinOutput>
{
    try {
        const parsedArgs = parseArgs(
            args,
            ["n", "b", "v", "t", "e", "A"],
            1
        );

        return "";
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