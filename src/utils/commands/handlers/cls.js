import store from "@/store";

export default function cls()
{
    store.commit('cls');
    return "ok";
}