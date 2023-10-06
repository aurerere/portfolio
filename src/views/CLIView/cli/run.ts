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
        if (input.trim() !== "" && !current.includes(input))
            current.push(input);

        console.log(current)
        return current;
    });
}
