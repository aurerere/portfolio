export default function echo(args: string[]): CLI.BinOutput
{
    return args.join(" ");
}
