import parsePath from "@/utils/misc/parsePath";
import ls from "@/utils/commands/handlers/ls";

export default async function exe(path)
{
    const file = parsePath(path);

    const { filePath, exists, fileType } = ls(file);

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
    else if (exists === undefined) {
        return {
            component: "error",
            content: `cannot back from home`
        };
    }
    else {
        return {
            component: "error",
            content: `no such file: "${path.replace('~', '/home/aureliendumay.me')}"`
        };
    }
}