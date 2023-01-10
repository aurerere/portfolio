import store from "../../store";
import ls from "./ls";
import parsePath from "../runCommand/parsePath";
import type {CommandResult, SimpleCommandResult} from "@/types";

export default function cd(to: string=''): CommandResult | SimpleCommandResult
{
    const path = parsePath(to);

    if (!to)
        return "ok";

    if (!path)
        return {
            component: 'error',
            content: "cannot back from 'aureliendumay.me'"
        };

    const content = ls(path);

    if (content.component === "error") {
        const message = content.more.exists ?
            `[error] "${path.join("/").replace('~', '/home/aureliendumay.me')}" is not a directory.` :
            `[error] no such directory: "${path.join("/").replace('~', '/home/aureliendumay.me')}".`;

        return {
            component: "error",
            content: message
        };
    }

    store.commit('setPath', path);
    return 'ok';
}