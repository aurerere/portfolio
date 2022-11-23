import store from "@/store";
import ls from "@/utils/commands/handlers/ls";
import cd from "@/utils/commands/handlers/cd";
import cat from "@/utils/commands/handlers/cat";
import exe from "@/utils/commands/handlers/exe";

//todo: promptParser & commandParser

const commands = new function() {
    this['cls'] = () => {
        store.commit('cls')
        return 'ok';
    };
    this['ping'] = async () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve('pong')
            }, 1000)
        })
    };
    this['ls'] = (args) => ls(args ? args : undefined);
    this['dir'] = this['ls'];
    this['help'] = () => 'cls, ping, help';
    this['cd'] = (to) => cd(to);
    this['exit'] = () => window.close();
    this['clear'] = this['cls'];
    this['cat'] = (file) => cat(file);
    this['execute'] = (file) => exe(file);
}



// async function promptParser(input)
// {
//     let commands = input.split('"');
// }

export default async function runCommand(input)
{
    const path = [...store.state.path];
    store.commit('pushHistory', {path, input: input});
    store.commit('pushCmdStack', input);
    let result;
    let command;

    if (input.trim().startsWith('./') || input.trim().startsWith('../'))
        result = await commands['execute'](input.trim());

    else {
        command = input.trim().split(' ')[0].toLowerCase();
        const args = input.trim().split(' ').slice(1);

        if (!input.trim()) {
            return;
        }

        for (let i = 0; i < args.length; i++)
            if (!args[i]) {
                args.splice(i, 1);
                --i;
            }

        if (commands[command.trim()]) {
            result = await commands[command.trim()](...args);
        }
    }

    // 'ok' is the returned value if nothing needs to be printed
    if (result !== "ok" && result)
        store.commit('setResult', result)
    else if (!result)
        store.commit(
            'setResult',
            { component: 'error', content: `Unknown command '${command}'. Type 'help' for the list of available commands`}
        );
}
