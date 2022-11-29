import store from "@/store";
import ls from "@/utils/commands/handlers/ls";
import parsePath from "@/utils/misc/parsePath";

export default function cd(to='')
{
    const path = parsePath(to);

    if (!to)
        return "ok";

    if (!path)
        return {
            component: 'error',
            content: "[cd] cannot go back from home."
        };

    const content = ls(path);

    if (content.component === "error") {
        let message = content.exists ?
            `[cd] '${path.join("/")}' is not a directory.` :
            `[cd] no such directory: '${path.join("/")}'.`;

        return {
            component: "error",
            content: message
        };
    }

    store.commit('setPath', path);
    return 'ok';
}