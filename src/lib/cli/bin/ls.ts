import {fileTreeTraveler, parseArgs, parsePath} from "@cli/core/utils";
import Ls from "@cli/components/Ls.svelte";
import {MONTH_NAMES_SHORT_EN} from "@utils/const";

type LsOutput = {
    result: { [key: string]: CLI.File | CLI.FolderMetadata },
    a: boolean,
    l: boolean
}

export default function ls(args: string[]): CLI.BinOutput<LsOutput>
{
    try {
        const {regularArgs, options} =
            parseArgs(args, ["a", "l", "all"], 1);

        const a = options
            .findIndex(val => val.option === "a" || val.option === "all") !== -1;

        const l = options
            .findIndex(val => val.option === "l") !== -1;

        const relativePath = regularArgs.length > 0 ? regularArgs[0] : ".";
        const to= parsePath(relativePath);

        const [dest, destType] = fileTreeTraveler(to);

        if (destType === "fileTree") {
            const result: LsOutput["result"] = {};

            for (let [name, metadata] of Object.entries(dest)) {

                if (metadata.mtime !== undefined) {
                    const mtime = new Date(metadata.mtime);
                    metadata.mtime = `${MONTH_NAMES_SHORT_EN[mtime.getMonth()]} ${mtime.getDate()} ${mtime.getFullYear()}`;
                }


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

            return {
                component: Ls,
                data: { result, a, l }
            };
        }
        else {
            return {
                component: Ls,
                data: {
                    result: {
                        [to[to.length -1]]: {
                            type: "file",
                            role: dest.role,
                            hidden: dest.hidden,
                            nlink: dest.nlink,
                            blksize: dest.blksize,
                            mtime: dest.mtime
                        }
                    },
                    a, l
                }
            };
        }
    }
    catch (e) {
        throw new Error("ls: " + (e as Error).message);
    }
}
