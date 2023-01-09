import cls from "@/utils/cli/commands/cls";

export default function onKeyDown(this: any, e: KeyboardEvent): void
{
    if (e.key === 'l') {
        if (this.isControlDown && !this.isShiftDown) {
            e.preventDefault();
            cls();
        }
    }

    if (e.key === 'Control') { // Need to modify that for macOS support
        this.isControlDown = true;
        return;
    }

    window.scrollTo(0, document.body.scrollHeight);
    if (document.activeElement !== this.$refs.prompt) {
        if (e.key === 'Shift') {
            this.isShiftDown = true;
            return;
        }

        if (e.key.startsWith('Arrow'))
            if (this.isShiftDown)
                return;

        if (!this.loading && !(this.isControlDown && e.key === 'c')) {
            this.promptFocusCaretEnd();
            window.scrollTo(0, document.body.scrollHeight);
        }
    }

}