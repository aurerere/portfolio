// @ts-ignore
import clear from "@/cli/commands/clear";

export default function onKeyDown(this: any, e: KeyboardEvent): void
{
    if (e.key.toLowerCase() === 'l') {
        if (this.isControlDown && !this.isShiftDown) {
            e.preventDefault();
            clear();
        }
    }

    if (e.key === 'Control') {
        this.isControlDown = true;

        if (this.deviceInfo.keyboardLayout === 'default') {
            this.isControlOrCommandDown = true
        }

        return;
    }

    if (e.key === 'Meta') {
        if (this.deviceInfo.keyboardLayout === 'apple') {
            this.isControlOrCommandDown = true;
        }
    }

    if (document.activeElement !== this.$refs.prompt) {
        if (e.key === 'Shift') {
            this.isShiftDown = true;
            return;
        }

        if (e.key.startsWith('Arrow'))
            if (this.isShiftDown)
                return;

        if (!this.loading && !(this.isControlOrCommandDown && e.key.toLowerCase() === 'c')) {
            this.promptFocusCaretEnd();
            window.scrollTo(0, document.body.scrollHeight);
        }
    }
    else {
        if (this.$refs.prompt.innerText !== this.input) {
            this.input = this.$refs.prompt.innerText;
            this.stackState = -1;
        }

        if (e.key.startsWith('Arrow'))
            return this.inputArrowHooker(e);

        if (e.key.startsWith('Enter')) {
            e.preventDefault();
            return this.enterHooker(false);
        }
    }
}