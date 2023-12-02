import fs, {readFileSync, writeFileSync} from "fs";
import {PluginOption} from "vite";
import YAML from "yaml";

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

type LanguageSensitiveString = {
    en: string,
    fr: string,
};

type Link = {
    url: string,
    icon: string,
    text: LanguageSensitiveString,
};

type Project = {
    name: string,
    status: "done" | "paused" | "in development" | "aborted",
    inProd: boolean,
    dates: [string, string],
    thumbnail: string,
    description: LanguageSensitiveString,
    tags: string[],
    done: boolean,
    links: Link[],
};

export default function vitePluginJson(): PluginOption {

    function go() {
        const fileTree: FileTree = {};

        dirToJson("./public/files/", fileTree);
        projectFilesToJson();

        writeFileSync("./public/fileTree.json", JSON.stringify(fileTree, null, 2));
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
            };
            dirToJson(path + element + "/", (to[element] as Folder).children);
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
            if (fs.existsSync(projectsPath + project + "/metadata.yml")) {
                const projectData =
                    YAML.parse(fs.readFileSync(projectsPath + project + "/metadata.yml", "utf-8")) as Project;

                if (
                    projectData?.name &&
                    projectData.tags?.length &&
                    projectData.dates?.length &&
                    projectData.status &&
                    (projectData.description?.fr && projectData.description?.en)
                )
                    projects.push(projectData);
            }
        }
        catch (e) {
            console.error(e)
        }

    }

    const formalData = YAML.parse(readFileSync("./i18n.yml", "utf-8"));
    formalData.projects = projects;
    writeFileSync("./public/formal.json", JSON.stringify(formalData, null, 2));
}
