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

    const file = path.pop();

    const content = ls(path).content[file];

    console.log(ls(path));

    if (!content)
        return {
            component: 'error',
            content: `[cat] no such file: '${file}'.`
        };

    if (content.type === "folder")
        return {
            component: 'error',
            content: `[cat] ${file} is a directory.`
        };

    return {
        component: 'cat',
        content: content.content,
        name: file
    };
}