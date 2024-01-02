import {bin} from "@cli/index";

export default function help(): CLI.BinOutput {
    const exclude: string[] = [""];
    let text: string = "\nHere is a list of commands implemented at the moment:\n\n";

    for (const command of Object.keys(bin)) {
        if (exclude.includes(command))
            continue;
        text += "- " + command + "\n";
    }

    return text + "\n";
}
