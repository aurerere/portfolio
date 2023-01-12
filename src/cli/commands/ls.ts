import store from "../../store";
import parsePath from "../runCommand/parsePath";
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

    let element = fileTree['~'];

    if (!path)
        return {
            component: 'error',
            content: "cannot back from 'aureliendumay.me'"
        }


    for (let i = 1; i < path.length + 1; i++)
    {
        if (typeof element === "object") {
            element = element[path[i]];
        }

        else {
            if (i !== path.length || typeof element === "undefined")
                return {
                    component: "error",
                    content:
                        `[error] no such file or directory: '${path.join('/').replace('~', '/home/aureliendumay.me')}'.`
                }

            else {
                console.log(element)
                return {
                    component: "error",
                    content: `[error] ${path.join('/').replace('~', '/home/aureliendumay.me')} is not a directory.`,
                    more: {
                        name: path[i],
                        fileType: element,
                        filePath: path.join('/').replace('~', '/home')
                    }
                };
            }
        }
    }
    // for (let i = 1; i < path.length; i++)
    // {
    //     if (content) {
    //         if (typeof content === "object") {
    //             content = content[path[i]];
    //             continue;
    //         }
    //
    //         let message;
    //
    //         if (typeof content === "undefined")
    //             message =
    //                 `[error] no such file or directory: '${path.join('/').replace('~', '/home/aureliendumay.me')}'.`;
    //
    //         else if (typeof content === "string")
    //             message =
    //                 `[error] ${path.join('/').replace('~', '/home/aureliendumay.me')} is not a directory.`;
    //
    //         return {
    //             component: "error",
    //             content: message,
    //             more: {
    //                 name: path[i],
    //                 exists: !!content,
    //                 fileType: content ? content : null,
    //                 filePath: path.join('/').replace('~', '/home')
    //             }
    //         };
    //     }
    //     else {
    //         return {
    //             component: "error",
    //             content: `[error] Internal.`
    //         };
    //     }
    // }

    return { component: "ls", content: element, more: {path} };
}