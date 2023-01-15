import sleep from "@/utils/sleep";
import type { CommandResult } from "@/types";

export default async function exit(): Promise<CommandResult>
{
    window.close();
    await sleep(50);

    return {
        component: "error",
        content: "[error] The app itself can't do that: Scripts may close only the windows that were opened by them."
    };
}