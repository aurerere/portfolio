import ls from "./commands/ls";
import cd from "./commands/cd";
import more from "./commands/more";
import exe from "./commands/exe";
import echo from "./commands/echo";
import pwd from "./commands/pwd";
import help from "./commands/help";
import ping from "./commands/ping";
import cls from "./commands/cls";
import djo from "./commands/djo";
import bleuenn from "./commands/bleuenn";
import iandry from "./commands/iandry";
import maximes from "./commands/maximes";
import open from "./commands/open";
import forbidden from "./commands/forbidden";


const commands: {[index: string]: Function} = {
    'cls': () => cls(),
    'ls': (path: string | undefined) => ls(path),
    'help': () => help(),
    'pwd': () => pwd(),
    'cd': (path: string) => cd(path),
    'echo': (...args: Array<string>) => echo(...args),
    'djo': () => djo(),
    'bleuenn': () => bleuenn(),
    'iandry': () => iandry(),
    'maximes': () => maximes(),
    'open': (path: string)  => open(path),

    // ASYNC -------------------------------------------------------------------
    'more': async (path: string) => await more(path),
    'ping': async () => await ping(),
    'execute': async (path: string) => await exe(path),

    // ENV VARIABLES -----------------------------------------------------------
    'github': () => exe('~/github'),
    'mailme': () => exe('~/mailme'),
    'linkedin': () => exe('~/linkedin'),

    // FORBIDDEN ---------------------------------------------------------------
    'rm': () => forbidden(),
    'rmdir': () => forbidden(),
    'mkdir': () => forbidden(),
    'touch': () => forbidden(),
    'cp': () => forbidden(),
    'mv': () => forbidden(),
    'sudo': () => forbidden(),
}

// ALIASES -----------------------------------------------------------------
commands['dir'] = commands['ls'];
commands['clear'] = commands['cls'];
commands['cat'] = commands['more'];

export default commands;