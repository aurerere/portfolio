export default function openMenu(this: any): void
{
    this.$refs.menu.classList.add('opened');
    this.$refs.menuOpener.classList.add('opened');
}