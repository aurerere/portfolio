import store from "@/store";
import fileTree from "@/utils/fileTree.json";
import parsePath from "@/utils/misc/parsePath";

export default function ls(relativePath=store.state.path)
{
    const path = typeof relativePath === "string"
      ? parsePath(relativePath)
      : relativePath
    ;

    let content = fileTree["~"].children;

    if (!path)
        return {
            component: 'error',
            content: "[ls] cannot go back from home, permission denied."
        }

    for (let i = 1; i < path.length; i++)
    {
        if (content[path[i]] && content[path[i]].type === "folder")
          content = content[path[i]].children;

        else {
            let message = content[path[i]] ?
                `[ls] ${path[i]} is not a directory.` :
                `[ls] no such file or directory: '${path[i]}'.`;

            return {
                component: "error",
                content: message,
                name: path[i],
                exists: !!content[path[i]],
                fileType: content[path[i]] ? content[path[i]].type : null,
                fileContent: content[path[i]] ? content[path[i]].content : null
            };
        }
    }

    return { component: "ls", content, path };
}