import ls from "@/cli/commands/ls";
import cd from "@/cli/commands/cd";
import more from "@/cli/commands/more";
import exe from "@/cli/commands/exe";
import echo from "@/cli/commands/echo";
import pwd from "@/cli/commands/pwd";
import help from "@/cli/commands/help";
import ping from "@/cli/commands/ping";
import cls from "@/cli/commands/cls";
import djo from "@/cli/commands/djo";
import bleuenn from "@/cli/commands/bleuenn";
import iandry from "@/cli/commands/iandry";
import maximes from "@/cli/commands/maximes";
import open from "@/cli/commands/open";
import forbidden from "@/cli/commands/forbidden";


const commands: {[name: string]: Function} = {
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