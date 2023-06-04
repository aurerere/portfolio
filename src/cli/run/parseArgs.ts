/**
 * @description Extracts and separates the args and the flags from input
 * @param payload the returned value of parseInput() (./parseInput.ts)
 * @return {[string[], string[]]} ([flags[], args[]])
 */
export default function parseArgs(payload: Array<string>): ParsedArgs
{
    const args = [];
    const flags = [];

    for (let i = 0; i < payload.length; i++) {
        // word flags
        if (payload[i].startsWith('--'))
            flags.push(payload[i].replace('-', ''));
        // char flags
        else if (payload[i].startsWith('-'))
            flags.push(...payload[i].replace('-', '').split(''));
        // args
        else
            args.push(payload[i]);
    }

    return [args, flags];
}
