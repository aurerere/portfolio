import parsePath from "@/utils/misc/parsePath";
import ls from "@/utils/commands/handlers/ls";

export default async function open(relativePath)
{
    if (!relativePath)
        return "ok"

    const file = parsePath(relativePath);

    const { filePath, exists, fileType } = ls(file);

    if (exists && fileType !== "folder") {
        // if (fileType === "app") {
        //     return "You found a limit of my terminal :'(";
        // }
        window.open(filePath, "", "width=1000,height=2000");
        return "ok";
    }
    else if (fileType === "folder" || relativePath === "./" || relativePath === ".")
        return {
            component: "error",
            content: `[error] "${file.join('/')
                .replace('~', '/home/aureliendumay.me')}" is a directory`
        };
    else if (exists === undefined) {
        return {
            component: "error",
            content: `[error] cannot back from home`
        };
    }
    else {
        return {
            component: "error",
            content: `[error] no such file: "${file.join('/')
                .replace('~', '/home/aureliendumay.me')}"`
        };
    }
}