import Ls from "@cli/components/Ls.svelte";
import {MONTH_NAMES_SHORT_EN} from "@utils/const";
import {parseArgs, parsePath} from "@cli/utils/helpers";
import {fileTreeTraveler} from "@cli/utils/fileSystem";

type LsOutput = {
    result: { [key: string]: CLI.File | CLI.FolderMetadata },
    a: boolean,
    l: boolean
}

export default function ls(args: string[]): CLI.BinOutput<LsOutput> {
    try {
        const {regularArgs, options} =
            parseArgs(args, ["a", "l", "all"], 1);

        const a = options.includesOneOf("a", "all");
        const l = options.includesOneOf("l");

        const relativePath = regularArgs.length > 0 ? regularArgs[0] : ".";
        const to = parsePath(relativePath);

        const [dest, destType] = fileTreeTraveler(to);

        if (destType === "fileTree") {
            const result: LsOutput["result"] = {};

            for (let [name, metadata] of Object.entries(dest)) {

                if (metadata.mtime !== undefined) {
                    const mtime = new Date(metadata.mtime);
                    metadata.mtime = `${MONTH_NAMES_SHORT_EN[mtime.getMonth()]} ${mtime.getDate()} ${mtime.getFullYear()}`;
                }

                result[name] = metadata;
            }

            return {
                component: Ls,
                data: { result, a, l }
            };
        }
        else {
            return {
                component: Ls,
                data: {
                    result: { [to[to.length -1]]: dest },
                    a, l
                }
            };
        }
    }
    catch (e) {
        throw new Error("ls: " + (e as Error).message);
    }
}
