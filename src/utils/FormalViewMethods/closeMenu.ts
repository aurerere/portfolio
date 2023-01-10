export default function closeMenu(this: any): void
{
    this.$refs.menu.classList.remove('opened');
    this.$refs.menuOpener.classList.remove('opened');
}