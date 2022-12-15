import store from "@/store";
import execute from "./execute";


//todo: comment
//todo: On améliore aussi pck c cheum
export default async function runCommand(input: string): Promise<any>
{
    const path = [...store.state.path];
    store.commit('pushHistory', {path, input: input});
    store.commit('pushCmdStack', input);

    input = input.trim();

    if (input === "")
        return;

    let opened = false;
    let openedWith = null;
    const commands = [[""]];
    let commandIndex = 0;
    let idx = 0;

    for (let i = 0; i < input.length; i++) {
        if (opened) {
            if (input[i] === openedWith) {
                opened = false;
                openedWith = null;
                if (i < input.length - 1) {
                    commands[commandIndex].push("");
                    idx++;
                }
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
                    if (commands[commandIndex][idx] !== "") {
                        idx++;
                        commands[commandIndex].push("");
                    }
                    break;
                case " ":
                    if (commands[commandIndex][idx] !== "") {
                        idx++;
                        commands[commandIndex].push("");
                    }
                    break;
                case ">":
                    return store.commit(
                        "setResult",
                        [{
                            component: "error",
                            content: `\n${input}\n${' '.repeat(i)}^\n[Syntax error] Unhandled operator.\n`
                        }]
                    )
                case "|":
                case ";":
                case "&":
                    if (input[i] === '&' && (i + 1 >= input.length || input[i + 1] !== "&"))
                        return store.commit(
                            "setResult",
                            [{
                                component: "error",
                                content: `\n${input}\n${' '.repeat(i)}^\n[Syntax error] Unhandled operator.\n`
                            }]
                        )
                    if (i + 1 >= input.length)
                        return store.commit(
                            "setResult",
                            [{
                                component: "error",
                                content: `\n${input}\n${' '
                                    .repeat(i)}^\n[Syntax error] A command is expected after a separator.\n`
                            }]
                        )
                    else {
                        if ((commands[commandIndex].length === 1 && commands[commandIndex][0] === ""))
                            return store.commit(
                                "setResult",
                                [{
                                    component: "error",
                                    content: `\n${input}\n${' '.repeat(i)}^\n[Syntax error] Unexpected operator.\n`
                                }]
                            )

                        if (commands[commandIndex][idx] === "")
                            commands[commandIndex].pop();

                        commandIndex++;
                        idx = 0;
                        commands.push([]);
                        commands[commandIndex].push("");

                        if (input[i] === "&")
                            ++i;
                    }
                    break;
                default:
                    commands[commandIndex][idx] += input[i];
            }
        }
    }

    if (opened)
        return store.commit(
            'setResult',
            [{
                component: "error",
                content: `\n${input}\n${' '.repeat(input.length + 1)}^\n[Syntax error] Unclosed string.\n`
            }]
        );

    return await execute(commands);
}