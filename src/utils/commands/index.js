import store from "@/store";
import ls from "@/utils/commands/handlers/ls";
import cd from "@/utils/commands/handlers/cd";

const commands = {
    'cls': () => {
        store.commit('cls')
        return 'ok';
    },
    'ping': async () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve('pong')
            }, 1000)
        })
    },
    'ls': () => {return {component: "ls", content: ls()}},
    'help': () => 'cls, ping, help',
    'cd': (to) => cd(to),
    'exit': () => window.close()
}

export default async function runCommand(input)
{
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
            `Unknown command '${command}'. Type 'help' for the list of available commands`
        );
}
