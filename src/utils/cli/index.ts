import ls from "./handlers/ls";
import cd from "@/utils/cli/handlers/cd";
import more from "@/utils/cli/handlers/more";
import exe from "@/utils/cli/handlers/exe";
import echo from "@/utils/cli/handlers/echo";
import pwd from "@/utils/cli/handlers/pwd";
import help from "@/utils/cli/handlers/help";
import ping from "@/utils/cli/handlers/ping";
import cls from "@/utils/cli/handlers/cls";
import djo from "@/utils/cli/handlers/djo";
import bleuenn from "@/utils/cli/handlers/bleuenn";
import iandry from "@/utils/cli/handlers/iandry";
import maximes from "@/utils/cli/handlers/maximes";
import open from "@/utils/cli/handlers/open";
import forbidden from "@/utils/cli/handlers/forbidden";


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