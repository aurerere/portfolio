import fs from "fs";
import {PluginOption} from "vite";
import toml from "toml";

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
        const fileTree: FileTree = {};

        dirToJson("./public/files/", fileTree);
        projectFilesToJson();

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

function projectFilesToJson()
{
    const projectsPath = "./public/files/projects/";
    const projectsDir = fs.readdirSync(projectsPath);
    const projects = [];


    for (let project of projectsDir)
    {
        try {
            if (
                fs.existsSync(projectsPath + project + "/thumbnail.png") &&
                fs.existsSync(projectsPath + project + "/desc.toml")
            ) {
                const projectData =
                    toml.parse(fs.readFileSync(projectsPath + project + "/desc.toml", "utf-8"));

                projects.push(projectData);
            }
            else {

            }
        }
        catch (e) {
            console.error(e)
        }

    }


}
