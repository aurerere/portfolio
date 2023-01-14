import ls from "./ls";
import type {CommandResult, LsResult, SimpleCommandResult} from "@/types";

export default async function more(relativePath: string): Promise<SimpleCommandResult | CommandResult>
{
    if (!relativePath)
        return {
            component: "error",
            content: `[error] Usage: more <path>`
        }

    const { realPath, exists, isDir, invalidPath, path, name }: LsResult["more"] = ls(relativePath).more;

    if (invalidPath)
        return {
            component: "error",
            content: `[error] cannot back from 'aureliendumay.me'`
        }

    if (exists && !isDir) {
        const response = await fetch(realPath);
        const fileContent = await response.text();

        return {
            component: 'more',
            content: fileContent,
            more: { name }
        };
    }
    else if (isDir)
        return {
            component: "error",
            content: `[error] "${path.join('/').replace('~', '/home/aureliendumay.me')}" is a directory`
        };
    else {
        return {
            component: "error",
            content: `[error] no such file: "${path.join('/').replace('~', '/home/aureliendumay.me')}"`
        };
    }
}