import {Cleared, PreviousCommands} from "../../../../stores";

export default function clear(payload?: CLI.BinInput): CLI.BinOutput
{
    PreviousCommands.set([]);
    Cleared.set(true);
    return "ok";
}
