import store from "@/store";
import parsePath from "@/utils/misc/parsePath";

export default function ls(relativePath=store.state.path)
{
    const path = typeof relativePath === "string"
      ? parsePath(relativePath)
      : relativePath
    ;

    let fileTree = store.state.fileTree;
    let content = fileTree["~"].children;

    if (!path)
        return {
            component: 'error',
            content: "[error] cannot go back from home, permission denied."
        }

    for (let i = 1; i < path.length; i++)
    {
        if (content[path[i]] && content[path[i]].type === "folder")
          content = content[path[i]].children;

        else {
            let message = content[path[i]] ?
                `[error] ${path.join('/').replace('~', '/home/aureliendumay.me')} is not a directory.` :
                `[error] no such file or directory: '${path.join('/').replace('~', '/home/aureliendumay.me')}'.`;

            return {
                component: "error",
                content: message,
                name: path[i],
                exists: !!content[path[i]],
                fileType: content[path[i]] ? content[path[i]].type : null,
                filePath: content[path[i]] ? content[path[i]]['realPath'] : null
            };
        }
    }

    return { component: "ls", content, path };
}