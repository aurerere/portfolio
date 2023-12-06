import clear from "@cli/bin/clear";
import cd from "@cli/bin/cd";
import ls from "@cli/bin/ls";
import history from "@cli/bin/history";
import cat from "@cli/bin/cat";
import pwd from "@cli/bin/pwd";
import echo from "@cli/bin/echo";
import help from "@cli/bin/help";

const bin: { [key: string]: (args: string[]) => Promise<CLI.BinOutput> | CLI.BinOutput } = {
    help,
    ls,
    cd,
    cat,
    pwd,
    echo,
    history,
    clear
}

bin["cls"] = bin["clear"];
bin["c"] = bin["clear"];

export default bin;
