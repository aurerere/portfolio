import store from "@/store";
import type {SimpleCommandResult} from "@/types";

export default function pwd(): SimpleCommandResult
{
    return store.state.path
        .join('/')
        .replace('~', '/home/aureliendumay.me');
}