import {InputHistoryStack, ExecutionHistory} from "@stores";

export default async function run(input: string, path: string[]): Promise<void>
{

    ExecutionHistory.update(value => {
        value.push({
            path,
            command: { input, output: [] },
            cancelled: false
        })

        return value;
    });

    InputHistoryStack.update(value => {
        if (value.includes(input))
            value.splice(value.indexOf(input), 1);

        if (input.trim() !== "")
            value.unshift(input);

        console.info("InputHistoryStack", value)
        return value;
    });

}
