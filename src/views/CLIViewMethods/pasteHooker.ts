import insertAtCaretLocation from "@/views/CLIViewMethods/insertAtCaretLocation";

export default async function pasteHooker(this: any, e: ClipboardEvent): Promise<void>
{
    if (!e.clipboardData)
        return;

    const data = e.clipboardData.getData('Text').replaceAll('\r', '');

    if (data.includes('\n')) {
        const inputs = data.split('\n');
        const inputLastIdx = inputs.length - 1;

        for (let i = 0; i < inputLastIdx; i++) {
            this.input = inputs[i];
            await this.enterHooker(true);
        }

        insertAtCaretLocation(inputs[inputLastIdx]);
    }
    else
        insertAtCaretLocation(data);

    e.preventDefault();
}