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
}