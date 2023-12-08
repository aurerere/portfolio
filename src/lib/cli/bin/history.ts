import {get} from "svelte/store";

import {InputHistoryStack} from "@stores";

export default function history(): CLI.BinOutput
{
    const history = get(InputHistoryStack);

    return history.reverse().join("\n")
}
