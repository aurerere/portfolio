import store from "@/store";

export default function pwd(): SimpleCommandResult
{
    return store.state.path
        .join('/')
        .replace('~', '/home/aureliendumay.me');
}
