export default function insertAtCaretLocation(toInsert: string): void
{
    // https://stackoverflow.com/questions/55774733/how-to-modify-copied-text-before-pasting-using-javascript
    const selection = window.getSelection();

    if (!selection || !selection.rangeCount)
        return;

    selection.deleteFromDocument();
    selection.getRangeAt(0).insertNode(document.createTextNode(toInsert))
    selection.collapseToEnd();
}