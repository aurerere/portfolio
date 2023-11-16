import clear from "@cli/bin/clear";
import cd from "@cli/bin/cd";
import ls from "@cli/bin/ls";
import history from "@cli/bin/history";
import cat from "@cli/bin/cat";
import pwd from "@cli/bin/pwd";
import echo from "@cli/bin/echo";

const bin: { [key: string]: (args: string[]) => Promise<CLI.BinOutput> | CLI.BinOutput } = {
    clear,
    cd,
    ls,
    history,
    cat,
    pwd,
    echo
}

bin["cls"] = bin["clear"];
bin["c"] = bin["clear"];

export default bin;
