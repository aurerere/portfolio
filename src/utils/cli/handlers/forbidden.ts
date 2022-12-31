import type {CommandResult} from "@/types";

export default function forbidden(): CommandResult
{
    return {
        component: "error",
        content: "[error] Permission denied."
    };
}