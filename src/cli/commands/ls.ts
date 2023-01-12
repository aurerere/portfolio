import store from "../../store";
import parsePath from "../runCommand/parsePath";
import type { CommandResult, FileTree } from "@/types";

export default function ls(relativePath: Array<string> | string = store.state.path): CommandResult
{
    // if the function is called with a command with the path as an arg,
    // we have to parse the path otherwise it is called with the current path already parsed
    const path = typeof relativePath === "string"
      ? parsePath(relativePath)
      : relativePath
    ;

    // if the parser returned false it means that the path is invalid
    if (!path)
        return {
            component: 'error',
            content: "cannot back from 'aureliendumay.me'"
        }

    const fileTree: FileTree | null = store.state.fileTree;

    if (fileTree === null)
        return {
            component: "error",
            content: "[error] Internal."
        }

    // we set the path at the root of the file tree
    let element = fileTree['~'];

    // we loop through the path to get the element at the end of the path
    for (let i = 1; i < path.length; i++)
    {
        // if the element is an object it means that it is a directory
        if (element && typeof element === "object") {
            if (element[path[i]] && typeof element[path[i]] === "object")
                element = element[path[i]];

            else {
                // if the element exists, but it is not an object it means that it is a file.
                // we need to check if it is the last element of the path because we use the more part of the returned
                // value in cd(), more(), open() and a file can't have children
                if (element[path[i]] && i === path.length - 1)
                    return {
                        component: "error",
                        content: `[error] ${path.join('/').replace('~', '/home/aureliendumay.me')} is not a directory.`,
                        more: {
                            exists: true,
                            name: path[i],
                            fileType: element,
                            filePath: path.join('/').replace('~', '/home')
                        }
                    };

                else {
                    return {
                        component: "error",
                        content: `[error] no such file or directory: '${
                            path.join('/').replace('~', '/home/aureliendumay.me')
                        }'.`,
                        more: { exists: false, name: null, fileType: null, filePath: null }
                    }
                }
            }
        }
    }

    return { component: "ls", content: element, more: {path, isDir: true} };
}