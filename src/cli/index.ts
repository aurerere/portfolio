import ls from "@/cli/commands/ls";
import cd from "@/cli/commands/cd";
import more from "@/cli/commands/more";
import exe from "@/cli/commands/exe";
import echo from "@/cli/commands/echo";
import pwd from "@/cli/commands/pwd";
import help from "@/cli/commands/help";
import ping from "@/cli/commands/ping";
import clear from "@/cli/commands/clear";
import djo from "@/cli/commands/djo";
import bleuenn from "@/cli/commands/bleuenn";
import iandry from "@/cli/commands/iandry";
import maximes from "@/cli/commands/maximes";
import open from "@/cli/commands/open";
import forbidden from "@/cli/commands/forbidden";
import corentin from "@/cli/commands/corentin";
import exit from "@/cli/commands/exit";


const commands: {[name: string]: Function} = {
    clear, // OK
    ls,
    help, // OK
    pwd, // OK
    cd, // OK
    echo,
    djo, // OK
    bleuenn, // OK
    iandry, // OK
    maximes, // OK
    corentin, // OK
    'sl': () => "flemme", // OK
    'xdg-open': open,

    // async
    'more': async (args:any) => await more(args),
    'ping': async () => await ping(),
    'exit': async () => await exit(),

    // env
    'github': () => exe('~/github'),
    'mailme': () => exe('~/mailme'),
    'linkedin': () => exe('~/linkedin'),

    // forbidden :p
    'rm': forbidden,
    'rmdir': forbidden,
    'mkdir': forbidden,
    'touch': forbidden,
    'cp': forbidden,
    'mv': forbidden,
    'sudo': forbidden,
    'chmod': forbidden,
}

// aliases
commands['dir'] = commands['ls'];
commands['c'] = commands['clear'];
commands['cls'] = commands['clear'];
commands['cat'] = commands['more'];
commands['open'] = commands['xdg-open'];
commands['less'] = commands['more'];

export default commands;
