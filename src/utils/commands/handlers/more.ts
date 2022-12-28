import parsePath from "../compute/parsePath";
import ls from "./ls";
import type {CommandResult, SimpleCommandResult} from "@/types";

export default async function more(relativePath: string): Promise<SimpleCommandResult | CommandResult>
{
    if (!relativePath)
        return "ok"

    const file = parsePath(relativePath);

    if (!file)
        return {
            component: "error",
            content: `[error] cannot back from 'aureliendumay.me'`
        }

    const { filePath, exists, fileType } = ls(file).more;

    if (exists && fileType !== "folder") {
        const response = await fetch(filePath);
        const fileContent = await response.text();

        return {
            component: 'more',
            content: fileContent,
            more: {
                name: file
            }
        };
    }
    else if (fileType === "folder" || relativePath === "./" || relativePath === ".")
        return {
            component: "error",
            content: `[error] "${file.join('/')}" is a directory`
        };
    else {
        return {
            component: "error",
            content: `[error] no such file: "${file.join('/').replace('~', '/home/aureliendumay.me')}"`
        };
    }
}