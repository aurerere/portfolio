import clear from "@cli/bin/clear";
import cd from "@cli/bin/cd";

const bin: { [key: string]: (args: string[]) => CLI.BinOutput } = {
    clear,
    cd
}

bin["cls"] = bin["clear"];
bin["c"] = bin["clear"];

export default bin;
