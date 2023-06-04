import store from "@/store";

export default function clear(): SimpleCommandResult
{
    store.commit('clear');
    return "ok";
}
