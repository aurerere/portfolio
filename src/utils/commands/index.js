import ls from "@/utils/commands/handlers/ls";
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

export default new function()
{
    // SYNC --------------------------------------------------------------------
    this['cls'] = () => cls();
    this['ls'] = (args) => ls(args ? args : undefined);
    this['help'] = () => help();
    this['pwd'] = () => pwd();
    this['cd'] = (to) => cd(to);
    this['more'] = (file) => more(file);
    this['execute'] = (file) => exe(file);
    this['echo'] = (...args) => echo(...args);
    this['djo'] = () => djo();
    this['bleuenn'] = () => bleuenn();
    this['iandry'] = () => iandry();
    this['maximes'] = () => maximes();

    // ASYNC -------------------------------------------------------------------
    this['ping'] = async () => await ping();

    // ALIASES -----------------------------------------------------------------
    this['dir'] = this['ls'];
    this['clear'] = this['cls'];
    this['cat'] = this['more'];

    // ENV VARIABLES -----------------------------------------------------------
    this['github'] = () => exe('~/github');
    this['mailme'] = () => exe('~/mailme');
    this['linkedin'] = () => exe('~/linkedin');
}
