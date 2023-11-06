import {InputHistoryStack, ExecutionHistory, CurrentPath} from "@stores";
import parse from "@cli/core/parse";
import RunError from "@cli/components/RunError.svelte";
import bin from "@cli/index";

export default async function run(input: string): Promise<void>
{
    let path: string[];

    const unsubscribe = CurrentPath.subscribe(value => path = [...value]);
    unsubscribe();

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

            try {
                const binName = (parsed[i] as string[]).shift() as string;
                const args = parsed[i] as string[];

                if (bin[binName]) {
                    const res = await bin[binName](args);
                    ExecutionHistory.update(value => {
                        if (value.length > 0 && !value[value.length -1].cancelled)
                            value[value.length - 1].output.push(res);
                        return value;
                    });
                }
                else {
                    handleError(new Error(binName + ": not found"));
                }
            }
            catch (e) {
                handleError(e as Error);
            }
        }
    }
    catch (e) {
        handleError(e as Error);
    }
}

function handleError(e: Error): void
{
    console.error(e);
    ExecutionHistory.update(value => {
        value[value.length - 1].output.push({
            component: RunError,
            data: { message: "Error: " + e.message }
        });
        return value;
    });
}
