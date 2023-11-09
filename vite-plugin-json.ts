import fs from "fs";
import {PluginOption} from "vite";

type FileTree = {
    [key: string]: File | Folder
};

type Folder = {
    type: "folder",
    role: "folder",
    hidden: boolean,
    children: FileTree,
    blksize: number,
    nlink: number,
    mtime: Date
}

type File = {
    type: "file",
    role: string,
    hidden: boolean,
    blksize: number,
    nlink: number,
    mtime: Date
}

export default function vitePluginJson(): PluginOption {

    function go() {
        const projects = [];
        const fileTree: FileTree = {};

        dirToJson("./public/files/", fileTree);
        projectFilesToJson(projects);

        fs.writeFileSync("./public/fileTree.json", JSON.stringify(fileTree, null, 2));
    }

    return {
        name: "json-builder",
        buildStart: go,
        handleHotUpdate({ file }) {
            if (file.includes("/files/"))
                go();
        }
    }
}

function dirToJson(path: string, to: FileTree)
{
    const content = fs.readdirSync(path);

    for (let element of content) {
        const elementMeta = fs.statSync(path + element);

        if (elementMeta.isDirectory()) {
            to[element] = {
                type: "folder",
                role: "folder",
                hidden: element.startsWith("."),
                nlink: elementMeta.nlink,
                blksize: elementMeta.blksize,
                mtime: elementMeta.mtime,
                children: {}
            }
            dirToJson(path + element + "/", to[element]["children"]);
        }
        else {
            to[element] = {
                type: "file",
                role: element.split(".").length === 1 ? "bin" : element.split(".")[1],
                hidden: element.startsWith("."),
                nlink: elementMeta.nlink,
                blksize: elementMeta.blksize,
                mtime: elementMeta.mtime
            }
        }
    }
}

function projectFilesToJson(projects: Array<any>)
{

}
