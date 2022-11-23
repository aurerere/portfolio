import parsePath from "@/utils/misc/parsePath";
import ls from "@/utils/commands/handlers/ls";

export default function exe(path)
{
    const file = parsePath(path);

    const { fileContent, exists, fileType } = ls(file);

    console.log(fileContent, exists, fileType);

    if (exists && fileType === "app") {
        eval(fileContent);
        return "ok";
    }
    else
        return {
            component: "error",
            content: `[execute] "${path}" is not an executable file`
        };
}