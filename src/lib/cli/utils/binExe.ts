import fileTreeTraveler, {createError, parsePath} from "@cli/core/utils";

export async function binExe(path: string, args: string[]): Promise<CLI.BinOutput>
{
    try {
        const to= parsePath(path);
        const [dest, destType] = fileTreeTraveler(to);

        if (destType === "fileTree" || dest.role !== "bin")
            createError("not found");

        const res = await fetch("/files/" + to.join("/"));
        const sourceCode = "{return " + await res.text() + "}";
        const func = new Function(sourceCode);
        const out = func.call(null).call(args);

        return out === undefined ? "" : out;
    }
    catch (e) {
        throw new Error(path + ": not found");
    }
}
