import type {CommandResult, SimpleCommandResult} from "@/types";

export default function bleuenn(): SimpleCommandResult | CommandResult
{
    document.body.style.background = "blue";
    return "ok";
}