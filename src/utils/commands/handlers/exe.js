import parsePath from "@/utils/misc/parsePath";
import ls from "@/utils/commands/handlers/ls";

export default function exe(path)
{
    if (/^\.[^/.]/gm.test(path))
        path = path.substr(1);

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