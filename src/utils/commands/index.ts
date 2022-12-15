import ls from "./handlers/ls";
import cd from "@/utils/commands/handlers/cd";
import more from "@/utils/commands/handlers/more";
import exe from "@/utils/commands/handlers/exe";
import echo from "@/utils/commands/handlers/echo";
import pwd from "@/utils/commands/handlers/pwd";
import help from "@/utils/commands/handlers/help";
import ping from "@/utils/commands/handlers/ping";
import cls from "@/utils/commands/handlers/cls";
import djo from "@/utils/commands/handlers/djo";
import bleuenn from "@/utils/commands/handlers/bleuenn";
import iandry from "@/utils/commands/handlers/iandry";
import maximes from "@/utils/commands/handlers/maximes";
import open from "@/utils/commands/handlers/open";
import forbidden from "@/utils/commands/handlers/forbidden";


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