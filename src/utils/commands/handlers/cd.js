import store from "@/store";
import ls from "@/utils/commands/handlers/ls";
import parsePath from "@/utils/misc/parsePath";

export default function cd(to='')
{
    const path = parsePath(to);

    if (!to)
        return "ok";

    if (!path || to === "/")
        return {
            component: 'error',
            content: "[cd] cannot go back from home."
        };

    const content = ls(path);

    if (content.component === "error") {
        let message = content.exists ?
            `[cd] ${content.name} is not a directory.` :
            `[cd] no such directory: '${content.name}'.`;

        return {
            component: "error",
            content: message
        };
    }

    store.commit('setPath', path);
    return 'ok';
}