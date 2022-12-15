export default function parseArgs(args: Array<string>): [Array<string>, Array<string>]
{
    const flags = [];
    const argv = [];

    for (let i = 0; i < args.length; i++) {
        if (args[i].startsWith('-'))
            flags.push(args[i].replace('-', ''));
        else
            argv.push(args[i]);
    }

    return [flags, argv];
}