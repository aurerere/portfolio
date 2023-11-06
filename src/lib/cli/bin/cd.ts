import {CurrentPath} from "@stores";
import {fileTreeTraveler, parsePath} from "@cli/core/utils";

export default function cd(args: string[]): CLI.BinOutput
{
    if (args.length > 1)
        throw new Error("cd: too many arguments");

    if (args.length === 0) {
        CurrentPath.set(["~"]);
        return "";
    }

    try {
        const to= parsePath(args[0]);

        const dest = fileTreeTraveler(to);

        if (typeof dest !== "string") {
            CurrentPath.set(["~", ...to]);
        }
        else {
            throw new Error("Not a directory")
        }
    }
    catch (e) {
        switch ((e as Error).message) {
            case "Not a directory":
            case "No such file or directory":
                throw new Error("cd: " + args[0] + ": " + (e as Error).message);
            default:
                throw new Error("cd: " + (e as Error).message);
        }
    }

    return "";
}
