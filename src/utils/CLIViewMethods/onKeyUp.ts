export default function onKeyUp(this: any, e: KeyboardEvent): void
{
    if (e.key === 'Shift')
        this.isShiftDown = false;

    if (e.key === 'Control')
        this.isControlDown = false;
}