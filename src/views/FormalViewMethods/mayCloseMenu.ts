export default function mayCloseMenu(this: any, e: ClickEvent): void
{
    if (e.target.classList.contains('button'))
        return;

    const menu = this.$refs.menu;

    if ((!menu.contains(e.target) && menu !== e.target) && !this.$refs.menuOpener.contains(e.target)) {
        this.closeMenu();
    }
    else {
        if (e.target.classList.contains('anchor')) {
            this.closeMenu();
        }
    }
}
