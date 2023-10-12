import {InputHistoryStack, PreviousCommands} from "../../../stores";

export default async function run(input: string, path: string[]): Promise<void>
{
    PreviousCommands.update(current => {
        current.push({
            path,
            command: { input, output: [] },
            cancelled: false
        })

        return current;
    });

    InputHistoryStack.update(current => {
        if (current.includes(input))
            current.splice(current.indexOf(input), 1);

        if (input.trim() !== "")
            current.unshift(input);

        console.log("InputHistoryStack", current)
        return current;
    });
}
