import type {CommandResult} from "@/types";

export default function echo(...args: Array<string>): CommandResult
{
    return {
        component: "echo",
        content: args.join("\n")
    }
}