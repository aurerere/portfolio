import store from "@/store";
import ls from "@/utils/commands/handlers/ls";
import cd from "@/utils/commands/handlers/cd";
import cat from "@/utils/commands/handlers/cat";
import exe from "@/utils/commands/handlers/exe";
import echo from "@/utils/commands/handlers/echo";

//todo: finish parser
//todo: fix commands takes only one argument

export const commands = new function() {
    this['cls'] = () => { store.commit('cls'); return 'ok' };
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
    this['echo'] = (...args) => echo(...args);
}
