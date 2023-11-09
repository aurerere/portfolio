import {fileTreeTraveler, parseArgs, parsePath} from "@cli/core/utils";
import Ls from "@cli/components/Ls.svelte";

type LsOutput = {
    result: { [key: string]: CLI.File | CLI.FolderMeta },
    a: boolean,
    l: boolean
}

export default function ls(args: string[]): CLI.BinOutput<LsOutput>
{
    try {
        const parsedArgs = parseArgs(args, ["a", "l", "all"]);
        const relativePath = parsedArgs.regularArgs.length > 0 ? parsedArgs.regularArgs[0] : ".";
        const to= parsePath(relativePath);

        const [dest, destType] = fileTreeTraveler(to);

        const result: LsOutput["result"] = {};

        if (destType === "fileTree") {
            for (let [name, metadata] of Object.entries(dest)) {
                if (metadata.type === "file")
                    result[name] = metadata;
                else {
                    result[name] = {
                        type: "folder",
                        role: "folder",
                        hidden: metadata.hidden,
                        nlink: metadata.nlink,
                        blksize: metadata.blksize,
                        mtime: metadata.mtime
                    };
                }
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
