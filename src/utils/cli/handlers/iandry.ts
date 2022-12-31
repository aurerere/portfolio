import type {SimpleCommandResult} from "@/types";

export default function iandry(): SimpleCommandResult
{
    document.body.style.background = "#1e1f22";
    document.querySelectorAll('p').forEach(p => {
        p.style.animation = "none";
    });

    return "ok";
}