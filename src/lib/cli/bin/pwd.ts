import {CurrentPath} from "@stores";

export default function pwd(): CLI.BinOutput
{
    let path: string[] | null = null;

    const unsubscribe = CurrentPath.subscribe(val => path = val);
    unsubscribe();

    if (path === null)
        throw Error("Internal");

    return (path as string[]).join("/").replace("~", "/home/aureliendumay.me")
}
