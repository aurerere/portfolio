export default function inputArrowHooker(this: any, e: KeyboardEvent): void
{
    console.log('here')
    if (e.key === 'ArrowUp') {
        if (this.stackState + 1 < this.previousCmdStack.length) {
            if (this.stackState === -1) {
                this.savedInput = this.$refs.prompt.innerText;
            }
            this.stackState++;

            this.$refs.prompt.innerText = this.previousCmdStack[this.stackState];
            this.input = this.previousCmdStack[this.stackState];

            this.promptFocusCaretEnd();
        }
    }
    else if (e.key === 'ArrowDown') {
        if (this.stackState > 0) {
            this.stackState--;

            this.$refs.prompt.innerText = this.previousCmdStack[this.stackState];
            this.input = this.previousCmdStack[this.stackState];

            this.promptFocusCaretEnd();
        }
        else if (this.stackState === 0) {
            this.stackState--;

            this.$refs.prompt.innerText = this.savedInput;
            this.input = this.savedInput;

            this.promptFocusCaretEnd();
        }
    }
}