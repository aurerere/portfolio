import store from "@/store";
import type {SimpleCommandResult} from "@/types";

export default function clear(): SimpleCommandResult
{
    store.commit('clear');
    return "ok";
}