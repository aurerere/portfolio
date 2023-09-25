import {Cleared, History} from "../../../../stores";

export default function clear(payload?: CLI.BinInput): CLI.BinOutput
{
    History.set([]);
    Cleared.set(true);
    return "ok";
}
