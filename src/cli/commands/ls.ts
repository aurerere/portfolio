import store from "../../store";
import parsePath from "../runCommand/parsePath";
import type {FileTree, LsResult, ExistsLsMore, InvalidPathLsMore, DoesNotExistsLsMore} from "@/types";

export default function ls(relativePath: Array<string> | string = store.state.path): LsResult
{
    // if the function is called with a command with the path as an arg,
    // we have to parse the path otherwise it is called with the current path already parsed
    const path = typeof relativePath === "string"
      ? parsePath(relativePath)
      : relativePath
    ;

    const fileTree: FileTree | null = store.state.fileTree;

    // if the parser returned false it means that the path is invalid
    if (!path || fileTree === null)
        return {
            component: 'error',
            content: fileTree !== null ? "[error] cannot back from 'aureliendumay.me'" : "[error] Internal.",
            more: <InvalidPathLsMore> {
                invalidPath: true,
                path: null,
                isDir: null,
                exists: null,
                name: null,
                fileType: null,
                realPath: null
            }
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
                    return <LsResult> {
                        component: "error",
                        content: `[error] ${path.join('/').replace('~', '/home/aureliendumay.me')} is not a directory.`,
                        more: <ExistsLsMore> {
                            invalidPath: false,
                            path,
                            isDir: false,
                            exists: true,
                            name: path[i],
                            fileType: element[path[i]],
                            realPath: path.join('/').replace('~', '/home')
                        }
                    };

                else {
                    return {
                        component: "error",
                        content: `[error] no such file or directory: '${
                            path.join('/').replace('~', '/home/aureliendumay.me')
                        }'.`,
                        more: <DoesNotExistsLsMore> {
                            invalidPath: false,
                            path,
                            isDir: false,
                            exists: false,
                            name: null,
                            fileType: null,
                            realPath: null
                        }
                    }
                }
            }
        }
    }

    // the element is a directory
    return {
        component: "ls",
        content: element,
        more: <ExistsLsMore> {
            invalidPath: false,
            path,
            isDir: true,
            exists: true,
            name: null,
            fileType: null,
            realPath: path.join('/').replace('~', '/home')
        }
    };
}