import store from "@/store";
import commands from "@/cli";
import exe from "@/cli/commands/exe";

export default async function execute(parsedInput: Array<Array<string>>): Promise<void>
{
    let result, command, args;

    for (let i = 0; i < parsedInput.length; ++i)
    {
        result = undefined;
        command = parsedInput[i][0].toLowerCase();
        parsedInput[i].shift();
        args = parsedInput[i];

        if (command.startsWith('./') || command.startsWith('../') || command.startsWith('/'))
            result = await exe(command.trim());

        else if (commands[command])
            result = await commands[command](...args)

        if (result !== "ok" && result) {
            store.commit('pushResult', result)

            if (result.component === "error")
                break;
        }
        else if (!result) {
            store.commit('pushResult' ,{
                component: 'error',
                content: `Unknown command "${command}". Type "help" for the list of available commands`
            });
            break;
        }
    }
}