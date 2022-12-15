import parsePath from "../compute/parsePath";
import ls from "./ls";
import type {CommandResult, SimpleCommandResult} from "@/types";

export default async function open(relativePath: string): Promise<SimpleCommandResult | CommandResult>
{
    if (!relativePath)
        return "ok"

    const file = parsePath(relativePath);

    if (!file)
        return {
            component: "error",
            content: `cannot back from home`
        }

    const { filePath, exists, fileType } = ls(file).more;

    if (exists && fileType !== "folder") {
        window.open(filePath, "", "width=1000,height=2000");
        return "ok";
    }
    else if (fileType === "folder" || relativePath === "./" || relativePath === ".")
        return {
            component: "error",
            content: `[error] "${file.join('/')
                .replace('~', '/home/aureliendumay.me')}" is a directory`
        };
    else {
        return {
            component: "error",
            content: `[error] no such file: "${file.join('/')
                .replace('~', '/home/aureliendumay.me')}"`
        };
    }
}