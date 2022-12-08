export default function parseArgs(args)
{
    let flags = [];
    let argv = [];

    for (let i = 0; i < args; i++) {
        if (args[i].startsWith('-'))
            flags.push(args[i].replaceAll('-', ''));
        else
            argv.push(args[i]);
    }

    return [flags, argv];
}