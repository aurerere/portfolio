import ls from "./commands/ls";
import cd from "@/utils/cli/commands/cd";
import more from "@/utils/cli/commands/more";
import exe from "@/utils/cli/commands/exe";
import echo from "@/utils/cli/commands/echo";
import pwd from "@/utils/cli/commands/pwd";
import help from "@/utils/cli/commands/help";
import ping from "@/utils/cli/commands/ping";
import cls from "@/utils/cli/commands/cls";
import djo from "@/utils/cli/commands/djo";
import bleuenn from "@/utils/cli/commands/bleuenn";
import iandry from "@/utils/cli/commands/iandry";
import maximes from "@/utils/cli/commands/maximes";
import open from "@/utils/cli/commands/open";
import forbidden from "@/utils/cli/commands/forbidden";


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