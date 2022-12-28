import store from "../../../store";
import parsePath from "../compute/parsePath";
import type {CommandResult} from "@/types";

export default function ls(relativePath: Array<string> | string = store.state.path): CommandResult
{
    const path = typeof relativePath === "string"
      ? parsePath(relativePath)
      : relativePath
    ;

    const fileTree = store.state.fileTree;

    if (fileTree === null)
        return {
            component: "error",
            content: "[error] Internal."
        }

    let content = fileTree['~'].children;

    if (!path)
        return {
            component: 'error',
            content: "cannot back from 'aureliendumay.me'"
        }


    for (let i = 1; i < path.length; i++)
    {
        if (content) {
            if (content[path[i]] && content[path[i]].type === "folder")
                content = content[path[i]].children;

            else {
                const message = content[path[i]] ?
                    `[error] ${path.join('/').replace('~', '/home/aureliendumay.me')} is not a directory.` :
                    `[error] no such file or directory: '${path.join('/').replace('~', '/home/aureliendumay.me')}'.`;

                return {
                    component: "error",
                    content: message,
                    more: {
                        name: path[i],
                        exists: !!content[path[i]],
                        fileType: content[path[i]] ? content[path[i]].type : null,
                        filePath: content[path[i]] ? content[path[i]]['realPath'] : null
                    }
                };
            }
        }
        else {
            return {
                component: "error",
                content: `[error] Internal.`
            };
        }
    }

    return { component: "ls", content, more: {path} };
}