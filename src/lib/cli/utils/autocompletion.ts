import bin from "@cli/index";
import {CurrentPath} from "@stores";
import {fileTreeTraveler} from "@cli/utils/fileSystem";

export function getAutocompleteSuggestions(input: string): string[]
{
    try {
        const splitInput = input.split(/\|\||;/);
        const context = splitInput[splitInput.length - 1].trimStart();

        if (context === "") {
            return Object.keys(bin);
        }

        let path: string[] | null = null;
        const unsubscribe = CurrentPath.subscribe(value => path = value);
        unsubscribe();

        if (path === null)
            return [];

        if (context.endsWith(" ")) {
            const [dest, destType] = fileTreeTraveler(path);


        }

        if (context.trim().split(" ").length > 1) {
            /*
            * dir => "dir/"
            * file => "file "
            * */
        }

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
    catch {
        return [];
    }


}
