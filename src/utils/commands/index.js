import store from "@/store";
import ls from "@/utils/commands/handlers/ls";
import cd from "@/utils/commands/handlers/cd";
import cat from "@/utils/commands/handlers/cat";
import parsePath from "@/utils/misc/parsePath";

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
}

export default async function runCommand(input)
{
    // if (input.trim().startsWith('./' || '.')) {
    //     const path = parsePath(input.trim().slice(2));
    //     let file = ls(path);
    //     if (file.component === 'error') {
    //         if (ls(path).exists) {
    //
    //         }
    //         else {
    //
    //         }
    //     }
    // }

    const command = input.split(' ')[0].toLowerCase();
    const args = input.split(' ').slice(1);
    const path = [...store.state.path];

    store.commit('pushHistory', {path, input: input});

    if (!input.trim()) {
        return;
    }

    store.commit('pushCmdStack', input);

    if (commands[command]) {
        const result = await commands[command](...args);
        // 'ok' is the returned value if nothing needs to be printed
        if (result !== "ok")
            store.commit('setResult', result)
    }
    else
        store.commit(
            'setResult',
            { component: 'error', content: `Unknown command '${command}'. Type 'help' for the list of available commands`}
        );
}
