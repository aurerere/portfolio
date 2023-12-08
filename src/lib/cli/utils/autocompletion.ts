import {get} from "svelte/store";

import bin from "@cli/index";
import {CurrentPath} from "@stores";
import {fileTreeTraveler} from "@cli/utils/fileSystem";
import {parsePath} from "@cli/utils/helpers";

export function getSuggestions(input: string): string[]
{
    try {
        // splits the input to get the last instruction
        const splitInput = input.split(/\|\||;/);
        const currentInstruction = splitInput[splitInput.length - 1].trimStart();

        // it means that nothing was yet inputted in the last instruction => nothing to show
        if (currentInstruction === "") {
            return [];
        }

        // sees were we are in the last instruction
        const currentInstructionSplit = currentInstruction.split(" ");

        // it means that the user is looking for a command autocompletion
        if (currentInstructionSplit.length === 1) {
            console.log(currentInstructionSplit[0])
            return Object
                .keys(bin)
                .filter(binName => binName.startsWith(currentInstructionSplit[0]))
        }

        // gets the current path
        const path = [...get(CurrentPath)];
        path.pop();

        // it means that the user is looking for a path autocompletion, but nothing was yet inputted
        if (currentInstruction.endsWith(" ")) {
            const [dest, destType] = fileTreeTraveler(path);

            if (destType === "fileTree")
                return formatResponse(dest);
        }

        // extracts what the user began to type
        const inputtedPath = currentInstructionSplit[currentInstructionSplit.length - 1];
        const inputtedPathSplit = inputtedPath.split("/")

        // it means the input ends by / so we search for an element in the provided folder path
        if (inputtedPathSplit[inputtedPath.length - 1] === "") {
            const [dest, destType] = fileTreeTraveler(parsePath(inputtedPath));

            if (destType === "fileTree") {
                let res = []
                for (const element of Object.keys(dest)) {
                    if (dest[element].type === "folder")
                        res.push(element + "/")
                    else
                        res.push(element + " ")
                }

                return res;
            }

            return [];
        }
        else {

        }


        /*
        * dir => "dir/"
        * file => "file "
        * */

        // else if (workingOn.endsWith(" ") || workingOn.split) {
        //     let path: string[] | null = null;
        //     const unsubscribe = CurrentPath.subscribe(value => path = value);
        //     unsubscribe();
        //
        //     if (path === null)
        //         return [];
        //
        //     return Object.keys()
        // }

        return [];
    }
    catch (e) {
        console.log(e)
        return [];
    }
}

function formatResponse(fileTree: CLI.FileTree): string[] {
    let res = [];

    for (const element of Object.keys(fileTree)) {
        if (fileTree[element].type === "folder")
            res.push(element + "/")
        else
            res.push(element + " ")
    }

    return res;
}