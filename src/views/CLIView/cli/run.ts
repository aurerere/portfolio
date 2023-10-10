import {InputHistoryStack, Loading, PreviousCommands} from "../../../stores";

export default async function run(input: string, path: string[]): Promise<void>
{
    Loading.set(true);
    PreviousCommands.update(current => {
        current.push({
            path,
            command: { input, output: [] },
            cancelled: false
        })

        return current;
    });

    InputHistoryStack.update(current => {
        if (input.trim() !== "") {
            if (current.includes(input))
                current.splice(current.indexOf(input), 1);
            current.unshift(input);
        }

        console.log(current)
        return current;
    });
    Loading.set(false);
}
