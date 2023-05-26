export default function onKeyUp(this: any, e: KeyboardEvent): void
{
    if (e.key === 'Shift')
        this.isShiftDown = false;

    if (e.key === 'Control') {
        this.isControlDown = false;

        if (this.deviceInfo.keyboardLayout === 'default') {
            this.isControlOrCommandDown = false;
        }
    }

    if (e.key === 'Meta') {
        if (this.deviceInfo.keyboardLayout === 'apple') {
            this.isControlOrCommandDown = false;
        }
    }
}