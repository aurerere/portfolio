import runCommand from "@/cli/runCommand";

export default async function enterHooker(this: any, auto:boolean=true): Promise<void>
{
    if (!auto)
        this.input = this.$refs.prompt.innerText;

    console.log(this.$refs.prompt.innerText)
    this.loading = true;
    await runCommand(this.input);
    this.input = '';
    this.stackState = -1;
    this.loading = false;
}