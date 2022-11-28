export async function inputParser(input)
{
    let opened = false;
    let openedWith = null;
    let commands = [[]];
    let commandIndex = 0;
    let idx = 0;

    for (let i = 0; i < input.length; i++) {
        if (opened) {
            if (input[i] === openedWith) {
                opened = false;
                openedWith = null;
                idx++;
                commands[commandIndex].push("");
            }
            else {
                commands[commandIndex][idx] += input[i];
            }
        }
        else {
            switch (input[i]) {
                case '"':
                case "'":
                    opened = true;
                    openedWith = input[i];
                    idx++;
                    commands[commandIndex].push("");
                    break;
                case " ":
                    if (commands[commandIndex][idx] !== "") {
                        idx++;
                        commands[commandIndex].push("");
                    }
                    break;
                case "|":
                    commandIndex++;
                    idx = 0;
                    commands.push([]);
                    commands[commandIndex].push("");
                    if (commands[commandIndex - 1].length === 0)
                        return {
                            component: "error",
                            content: "[syntax] Unexpected separator."
                        }
                    break;
                case "&":
                    if (i + 1 < input.length && input[i + 1] === "&") {
                        commandIndex++;
                        idx = 0;
                        commands.push([]);
                        commands[commandIndex].push("");
                        i += 2;

                        if (commands[commandIndex - 1].length === 0)
                            return {
                                component: "error",
                                content: "[syntax] Unexpected separator."
                            }
                    }
                    break;
                default:
                    commands[commandIndex][idx] += input[i];
            }
        }
    }
    
    if (opened)
        return {
            component: "error",
            content: "[syntax] Unexpected end of input."
        }
    
    if (commands[commandIndex].length === 0)
        return {
            component: "error",
            content: "[syntax] Unexpected separator."
        }
    
    return execute(commands);
}