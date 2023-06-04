import store from "@/store";
import call from "./call";

/**
 * @description Parses the input and returns the commands in a digest array
 * @param input user's input
 */
export default async function parseInput(input: string): Promise<any>
{
    // Gets the relative path from the store
    const path = [...store.state.path];

    // Pushes the command to history so we can display it
    store.commit('pushHistory', {path, input: input, result: []});
    // pushes the input to the stack (upArrow quick access)
    store.commit('pushInputStack', input);

    input = input.trim();

    // Nothing is inputted, clean exit
    if (input === "")
        return;

    // quotes state
    let opened = false;
    // " or '
    let openedWith: "\"" | "'" | null = null;
    // each array (in the parent array) is a commands followed by its args
    const commands = [[""]];
    // command index
    let commandIndex = 0;
    // argument (0 is the command itself) index
    let argIndex = 0;

    for (let i = 0; i < input.length; i++)
    {
        // basically if we are in a string
        if (opened) {
            // Checks if it is the end of the string
            if (input[i] === openedWith) {
                opened = false;
                openedWith = null;

                // Checks if we are at the end of the input (to prevent generating an empty arg)
                if (i < input.length - 1) {
                    commands[commandIndex].push("");
                    argIndex++;
                }
            }
            // pushes the arg to the current command
            else {
                commands[commandIndex][argIndex] += input[i];
            }
        }
        else {
            switch (input[i]) {
                case '"':
                case "'":
                    // We are now in a string
                    opened = true;
                    // @ts-ignore (but why ??)
                    openedWith = input[i];

                    // prevents an empty arg
                    if (commands[commandIndex][argIndex] !== "") {
                        argIndex++;
                        commands[commandIndex].push("");
                    }
                    break;
                case " ":
                    // Jumps to the next arg if the previous is not empty
                    if (commands[commandIndex][argIndex] !== "") {
                        argIndex++;
                        commands[commandIndex].push("");
                    }
                    break;
                // Unhandled operators
                case ">":
                case "|":
                    return store.commit(
                        "setResult",
                        [{
                            component: "error",
                            content: `\n${input}\n${' '.repeat(i)}^\n[Syntax error] Unhandled operator.\n`
                        }]
                    )
                // Operators
                case ";":
                case "&":
                    // checks if the current command is empty
                    if ((commands[commandIndex].length === 1 && commands[commandIndex][0] === "")) {
                        // ; is still accepted
                        if (input[i] !== ";")
                            return store.commit(
                                "setResult",
                                [{
                                    component: "error",
                                    content: `\n${input}\n${' '.repeat(i)}^\n[Syntax error] Unexpected operator.\n`
                                }]
                            )
                        return "ok";
                    }
                    // Unhandled operators (&, ...)
                    if (input[i] === '&' && (i + 1 >= input.length || input[i + 1] !== "&"))
                        return store.commit(
                            "setResult",
                            [{
                                component: "error",
                                content: `\n${input}\n${' '.repeat(i)}^\n[Syntax error] Unhandled operator.\n`
                            }]
                        )
                    // Command ending by an empty operator
                    if ((input[i] !== '&' && i + 1 >= input.length) || (input[i] === '&' && i + 2 >= input.length)) {
                        // ; is still accepted
                        if (input[i] !== ';')
                            return store.commit(
                                "setResult",
                                [{
                                    component: "error",
                                    content: `\n${input}\n${' '
                                        .repeat(input[i] !== '&' ? i : i + 1)
                                    }^\n[Syntax error] Something is expected after this.\n`
                                }]
                            );
                        // ./call.ts
                        return await call(commands);
                    }
                    else {
                        //
                        if (commands[commandIndex][argIndex] === "")
                            commands[commandIndex].pop();

                        // moving to the next command
                        commandIndex++;
                        argIndex = 0;
                        commands.push([]);
                        commands[commandIndex].push("");

                        // we accept && but not &
                        if (input[i] === "&")
                            ++i;
                    }
                    break;
                default:
                    // adds the char to the current arg since it is not an operator
                    commands[commandIndex][argIndex] += input[i];
            }
        }
    }
    // if the input ends with a still opened string
    if (opened)
        return store.commit(
            'setResult',
            [{
                component: "error",
                content: `\n${input}\n${' '.repeat(input.length + 1)}^\n[Syntax error] Unclosed string.\n`
            }]
        );

    // ./call.ts
    return await call(commands);
}
