import parsePath from "@/utils/misc/parsePath";
import ls from "@/utils/commands/handlers/ls";

export default function cat(relativePath)
{
    if (!relativePath)
        return "ok"

    const path = typeof relativePath === "string"
        ? parsePath(relativePath)
        : relativePath
    ;

    const file = parsePath(path);

    const { fileContent, exists, fileType } = ls(file);

    if (fileType !== "app") {
        return {
            component: 'cat',
            content: fileContent,
            name: file
        };
    }
    else if (fileType === "folder" || relativePath === "./" || relativePath === ".")
        return {
            component: "error",
            content: `"${relativePath}" is a directory`
        };
    else if (exists === undefined) {
        return {
            component: "error",
            content: `cannot back from home`
        };
    }
    else {
        return {
            component: "error",
            content: `no such file: "${relativePath}"`
        };
    }
}