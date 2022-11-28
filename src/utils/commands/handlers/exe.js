import parsePath from "@/utils/misc/parsePath";
import ls from "@/utils/commands/handlers/ls";

export default function exe(path)
{
    const file = parsePath(path);

    const { fileContent, exists, fileType } = ls(file);

    if (fileType === "app") {
        eval(fileContent);
        return "ok";
    }
    else if (fileType === "folder" || path === "./")
        return {
            component: "error",
            content: `"${path}" is a directory`
        };
    else if (exists)
        return {
            component: "error",
            content: `"${path}" is not an executable file`
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
            content: `no such file: "${path}"`
        };
    }
}