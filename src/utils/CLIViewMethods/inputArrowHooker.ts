export default function inputArrowHooker(this: any, e: KeyboardEvent): void
{
    if (e.key === 'ArrowUp') {
        if (this.stackState + 1 < this.previousCmdStack.length) {
            this.stackState++;
            this.$refs.prompt.innerText = this.previousCmdStack[this.stackState];
            this.promptFocusCaretEnd();
        }
    }
    else if (e.key === 'ArrowDown') {
        if (this.stackState > 0) {
            this.stackState--;
            this.$refs.prompt.innerText = this.previousCmdStack[this.stackState];
            this.promptFocusCaretEnd();
        }
        else if (this.stackState === 0) {
            this.stackState--;
            this.$refs.prompt.innerText = '';
        }
    }
}