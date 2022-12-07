import parsePath from "@/utils/misc/parsePath";
import ls from "@/utils/commands/handlers/ls";

export default function more(relativePath)
{
    if (!relativePath)
        return "ok"

    const file = parsePath(relativePath);

    const { fileContent, exists, fileType } = ls(file);

    if (exists && fileType !== "folder") {
        return {
            component: 'more',
            content: fileContent,
            name: file
        };
    }
    else if (fileType === "folder" || relativePath === "./" || relativePath === ".")
        return {
            component: "error",
            content: `[error] "${file.join('/')}" is a directory`
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
            content: `[error] no such file: "${file.join('/').replace('~', '/home/aureliendumay.me')}"`
        };
    }
}