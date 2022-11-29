export default function echo(...args)
{
    return {
        component: "echo",
        content: args.join("\n")
    }
}