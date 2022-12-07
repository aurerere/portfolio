import store from "@/store";

export default function pwd()
{
    return store.state.path
        .join('/')
        .replace('~', '/home/aureliendumay.me');
}