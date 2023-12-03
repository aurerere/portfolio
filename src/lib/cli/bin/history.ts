import {InputHistoryStack} from "@stores";

export default function history(): CLI.BinOutput
{
    let history: string[] | null = null;

    const unsubscribe = InputHistoryStack.subscribe(val => history = [...val]);
    unsubscribe();

    if (history === null)
        throw new Error("Internal");

    return (history as string[]).reverse().join("\n")
}
