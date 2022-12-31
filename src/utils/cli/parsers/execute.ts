import store from "@/store";
import commands from "@/utils/cli";

export default async function execute(parsedInput: Array<Array<string>>): Promise<void>
{
    let result, command, args;
    const results = []

    for (let i = 0; i < parsedInput.length; ++i)
    {
        result = undefined
        command = parsedInput[i][0].toLowerCase();
        parsedInput[i].shift();
        args = parsedInput[i];

        if (command.startsWith('./') || command.startsWith('../') || command.startsWith('/'))
            result = await commands['execute'](command.trim());

        // console.table([command, args])
        else if (commands[command])
            result = await commands[command](...args)

        if (result !== "ok" && result) {
            results.push(result);

            if (result.component === "error")
                break;
        }
        else if (!result) {
            results.push({
                component: 'error',
                content: `Unknown command "${command}". Type "help" for the list of available commands`
            });
            break;
        }
    }

    if (results.length > 0)
        store.commit('setResult', results)
}