import {get} from "svelte/store";

import bin from "@cli/index";
import {CurrentPath} from "@stores";
import {fileTreeTraveler} from "@cli/utils/fileSystem";
import {parsePath} from "@cli/utils/helpers";

export function getSuggestions(input: string, caretPos: number): [string[], number]
{
    try {
        // splits the input to get the last instruction
        input = input.substring(0, caretPos)
        const splitInput = input.split(/\|\||;/);
        const currentInstruction = splitInput[splitInput.length - 1].trimStart();

        // it means that nothing was yet inputted in the last instruction => nothing to show
        if (currentInstruction === "") {
            return [[], 0];
        }

        // sees were we are in the last instruction
        const currentInstructionSplit = currentInstruction.split(" ");

        // it means that the user is looking for a command autocompletion
        if (
            currentInstructionSplit.length === 1 && !(
                currentInstruction.startsWith("../") ||
                currentInstruction.startsWith("./") ||
                currentInstruction.startsWith("/")
            )
        ) {
            return [
                Object.keys(bin).filter(binName => binName.startsWith(currentInstructionSplit[0])),
                currentInstructionSplit[0].length
            ]
        }

        // gets the current path
        const path = [...get(CurrentPath)];
        path.shift();

        // it means that the user is looking for a path autocompletion, but nothing was yet inputted
        if (currentInstruction.endsWith(" ")) {
            const [dest, destType] = fileTreeTraveler(path);

            if (destType === "fileTree")
                return [getFileTreeSuggestions(dest), 0];
        }

        // extracts what the user began to type
        const pathStartsWith = currentInstructionSplit[currentInstructionSplit.length - 1];
        const pathStartsWithSplit = pathStartsWith.split("/")

        // it means the input ends by / so we search for an element in the provided folder path
        if (pathStartsWithSplit[pathStartsWith.length - 1] === "") {
            const [dest, destType] = fileTreeTraveler(parsePath(pathStartsWith));

            if (destType === "fileTree")
                return [getFileTreeSuggestions(dest), 0];

            return [[], 0];
        }
        else {
            const last = pathStartsWithSplit.pop();
            const [dest, destType] = fileTreeTraveler(
                parsePath(pathStartsWithSplit.join('/'))
            );

            if (destType === "fileTree")
                return [getFileTreeSuggestions(dest, last), last?.length ?? 0];

            return [[], 0];
        }
    }
    catch {
        return [[], 0];
    }
}

function getFileTreeSuggestions(fileTree: CLI.FileTree, startsWith: string = ""): string[] {
    return Object.keys(fileTree)
        .filter(value =>
            value.toLowerCase().startsWith(startsWith.toLowerCase()) && value !== "." && value !== "..")
        .map(value => {
            if (fileTree[value].type === "folder")
                return value + "/";
            return value + " ";
        });
}
