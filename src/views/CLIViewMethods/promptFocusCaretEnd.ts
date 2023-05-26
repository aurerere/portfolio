export default function promptFocusCaretEnd(this: any): void
{
    const target = this.$refs.prompt;

    //https://stackoverflow.com/questions/1125292/how-to-move-cursor-to-end-of-contenteditable-entity
    const range = document.createRange();
    const sel = window.getSelection();

    if (!sel)
        return;

    range.selectNodeContents(target);
    range.collapse(false);
    sel.removeAllRanges();
    sel.addRange(range);
    target.focus();
    range.detach(); // optimization

    // set scroll to the end if multiline
    target.scrollTop = target.scrollHeight;
}