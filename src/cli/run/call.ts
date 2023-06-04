import store from "@/store";
import commands from "@/cli";
import exe from "@/cli/commands/exe";
import parseArgs from "@/cli/run/parseArgs";


/**
 * @description Calls the parseInput() returned value's commands (or return an error if the command does not exist)
 * @param parsedInput parseInput() returned value
 * @return void
 */
export default async function call(parsedInput: Array<Array<string>>): Promise<void>
{
    let result, command, args;

    // loops through the command array (since we accept multiple commands)
    for (let i = 0; i < parsedInput.length; ++i)
    {
        // No result atm
        result = undefined;
        // Gets the command
        command = parsedInput[i][0].toLowerCase();
        // Gets the args
        parsedInput[i].shift();
        args = parsedInput[i];

        // Checks if it is a program
        if (command.startsWith('./') || command.startsWith('../') || command.startsWith('/'))
            result = await exe(command.trim());

        // Checks if the command exits
        else if (commands[command])
            // ./parseArgs.ts and ../index.ts
            result = await commands[command](parseArgs(args));

        // Pushes the command result to the store
        if (result !== "ok" && result) {
            store.commit('pushResult', result);

            // TODO: check if the next command is called near a pipe or near & before breaking the loop
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
