import parsePath from "../utils/parsePath";
import ls from "./ls";

export default async function open(relativePath: string): Promise<SimpleCommandResult | CommandResult>
{
    if (!relativePath)
        return {
            component: "error",
            content: '[error] Usage: xdg-open <path>'
        }

    const { realPath, exists, isDir, path, invalidPath } = ls(relativePath).more;

    if (invalidPath)
        return {
            component: "error",
            content: `[error] cannot back from 'aureliendumay.me'`
        }

    if (exists && !isDir) {
        window.open(realPath, "", "width=1000,height=2000");
        return "ok";
    }
    else if (isDir)
        return {
            component: "error",
            content: `[error] "${path.join('/')
                .replace('~', '/home/aureliendumay.me')}" is a directory`
        };
    else {
        return {
            component: "error",
            content: `[error] no such file: "${path.join('/')
                .replace('~', '/home/aureliendumay.me')}"`
        };
    }
}
