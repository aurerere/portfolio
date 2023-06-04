import store from "@/store";

export default function fileTreeTraveler(path: string[]): FileTreeTravelerResult
{
    const fileTree = store.state.fileTree as any;

    let element = fileTree['~'];

    for (let i = 1; i < path.length; i++) {
        if (typeof element[path[i]] === "object") {
            element = element[path[i]];
            continue;
        }

        if (element[path[i]] && i === path.length - 1)
            return {

            }

        else return {

        }
    }

    return {

    }
}
