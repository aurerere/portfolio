import {CurrentPath} from "@stores";
import {createError, parsePath} from "@cli/utils/helpers";
import {fileTreeTraveler} from "@cli/utils/fileSystem";

export default function cd(args: string[]): CLI.BinOutput {
    try {
        if (args.length > 1)
            return createError("too many arguments");

        if (args.length === 0) {
            CurrentPath.set(["~"]);
            return "";
        }

        const to= parsePath(args[0]);

        const [,destType] = fileTreeTraveler(to);

        if (destType === "fileTree") {
            if (to[to.length - 1] === "")
                to.pop();
            CurrentPath.set(["~", ...to]);
        }
        else {
            return createError("Not a directory");
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
