import bin from "@cli/index";

export default function help(): CLI.BinOutput
{
    const doNotShow: string[] = ["cls", "c"];
    let helpText: string = "\nHere is a list of commands implemented at the moment:\n\n";

    for (const command of Object.keys(bin)) {
        if (doNotShow.includes(command))
            continue;
        helpText += "- " + command + "\n";
    }

    return helpText += "\n";
}
