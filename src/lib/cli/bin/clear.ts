import {Cleared, ExecutionHistory} from "@stores";

export default function clear(payload?: CLI.BinInput): CLI.BinOutput
{
    ExecutionHistory.set([]);
    Cleared.set(true);
    return "ok";
}
