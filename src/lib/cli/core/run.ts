import {InputHistoryStack, ExecutionHistory, CurrentPath} from "@stores";
import parse from "@cli/core/parse";
import RunError from "@cli/components/RunError.svelte";
import {bin, aliases} from "@cli/index";
import {executeFromFile} from "@cli/utils/fileSystem";
import {get} from "svelte/store";

export default async function run(input: string): Promise<void> {
    const path = get(CurrentPath);

    ExecutionHistory.update(value => {
        value.push({ path, input, cancelled: false, output: [] });
        return value;
    });

    InputHistoryStack.update(value => {
        if (value.includes(input))
            value.splice(value.indexOf(input), 1);

        if (input.trim() !== "")
            value.unshift(input);

        return value;
    });

    try {
        const parsed = parse(input);

        for (let i = 0; i < parsed.length; i++) {
            if (typeof parsed[i] === "string")
                continue; // TODO: implement && and ()

            const calledKeyWord = (parsed[i] as string[]).shift() as string;
            const args = parsed[i] as string[];

            if (
                calledKeyWord.startsWith("./") ||
                calledKeyWord.startsWith("/") ||
                calledKeyWord.startsWith("../")
            ) {
                const res = await executeFromFile(calledKeyWord, args);
                ExecutionHistory.update(value => {
                    if (value.length > 0 && !value[value.length -1].cancelled)
                        value[value.length - 1].output.push(res);
                    return value;
                });
            }
            else if (bin[calledKeyWord]) {
                const res = await bin[calledKeyWord](args);
                ExecutionHistory.update(value => {
                    if (value.length > 0 && !value[value.length -1].cancelled)
                        value[value.length - 1].output.push(res);
                    return value;
                });
            }
            else if (aliases[calledKeyWord]) {
                const aliasV = aliases[calledKeyWord].split(" ");
                const binName = aliasV.shift();

                if (binName) {
                    console.log(binName)
                    const res = await bin[binName]([...aliasV, ...args]);
                    ExecutionHistory.update(value => {
                        if (value.length > 0 && !value[value.length -1].cancelled)
                            value[value.length - 1].output.push(res);
                        return value;
                    });
                }
            }
            else {
                handleError(new Error(calledKeyWord + ": not found"));
            }
        }
    }
    catch (e) {
        handleError(e as Error);
    }
}

function handleError(e: Error): void {
    console.error(e);
    ExecutionHistory.update(value => {
        value[value.length - 1].output.push({
            component: RunError,
            data: { message: "Error: " + e.message }
        });
        return value;
    });
}
