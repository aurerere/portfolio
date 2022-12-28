import parsePath from "../compute/parsePath";
import ls from "./ls";
import type {CommandResult, SimpleCommandResult} from "@/types";

export default async function exe(path: string): Promise<CommandResult | SimpleCommandResult>
{
    const file = parsePath(path);

    console.log(file);
    if (!file)
        return {
            component: "error",
            content: `cannot back from 'aureliendumay.me'`
        };

    const { filePath, exists, fileType } = ls(file).more;

    if (fileType === "app") {
        const response = await fetch(filePath);
        const fileContent = await response.text();

        eval(fileContent);
        return "ok";
    }
    else if (fileType === "folder" || path === "./")
        return {
            component: "error",
            content: `"${path.replace('~', '/home/aureliendumay.me')}" is a directory`
        };
    else if (exists)
        return {
            component: "error",
            content: `"${path.replace('~', '/home/aureliendumay.me')}" is not an executable file`
        };
    else {
        return {
            component: "error",
            content: `no such file: "${path.replace('~', '/home/aureliendumay.me')}"`
        };
    }
}