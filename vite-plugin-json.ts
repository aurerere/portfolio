import fs from "fs";
import {PluginOption} from "vite";

type FileTree = {
    [key: string]: File | Folder
};

type Folder = {
    type: "folder",
    hidden: boolean,
    children: FileTree
}

type File = {
    type: "file",
    hidden: boolean
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
        if (fs.statSync(path + element).isDirectory()) {
            to[element] = {
                type: "folder",
                hidden: element.startsWith("."),
                children: {}
            }
            dirToJson(path + element + "/", to[element]["children"]);
        }
        else {
            to[element] = {
                type: "file",
                hidden: element.startsWith(".")
            }
        }
    }
}

function projectFilesToJson(projects: Array<any>)
{

}
