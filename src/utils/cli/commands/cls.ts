import store from "@/store";

import type {SimpleCommandResult} from "@/types";

export default function cls(): SimpleCommandResult
{
    store.commit('cls');
    return "ok";
}