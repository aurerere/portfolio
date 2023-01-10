// @ts-ignore
import cls from "@/cli/commands/cls";

export default function onKeyDown(this: any, e: KeyboardEvent): void
{
    if (e.key === 'l') {
        if (this.isControlDown && !this.isShiftDown) {
            e.preventDefault();
            cls();
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

    window.scrollTo(0, document.body.scrollHeight);
    if (document.activeElement !== this.$refs.prompt) {
        if (e.key === 'Shift') {
            this.isShiftDown = true;
            return;
        }

        if (e.key.startsWith('Arrow'))
            if (this.isShiftDown)
                return;

        if (!this.loading && !(this.isControlOrCommandDown && e.key === 'c')) {
            this.promptFocusCaretEnd();
            window.scrollTo(0, document.body.scrollHeight);
        }
    }

}