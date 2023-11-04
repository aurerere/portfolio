import {Cleared, ExecutionHistory} from "@stores";

export default function clear(): CLI.BinOutput
{
    ExecutionHistory.set([]);
    Cleared.set(true);
    return "";
}
