import clear from "@cli/bin/clear";

const bin: { [key: string]: (args?: string[]) => CLI.BinOutput } = {
    clear
}

bin["cls"] = bin["clear"];
bin["c"] = bin["clear"];

export default bin;