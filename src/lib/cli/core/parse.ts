export default function parse(input: string): (string[] | string)[]
{
    input = input.trim();

    if (input === "")
        return [];

    const commands: (string[] | string)[] = [[""]]
    let opened: boolean = false;
    let commandIndex: number = 0;
    let openedWith: "'" | '"' | null = null;

    for (let i = 0; i < input.length; i++) {

        if (opened) {
            if (input[i] === openedWith) {
                opened = false;
                openedWith = null;

                // Checks if we are at the end of the input (to prevent generating an empty arg)
                if (i < input.length - 1) {

                    commands[commandIndex].push("");
                    argIndex++;
                }
            }
        }
    }

    return parsed;
}
