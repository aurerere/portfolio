import {get} from "svelte/store";

import {CurrentPath} from "@stores";

export default function pwd(): CLI.BinOutput
{
    const path = get(CurrentPath);
    return (path as string[]).join("/").replace("~", "/home/aureliendumay.me")
}
