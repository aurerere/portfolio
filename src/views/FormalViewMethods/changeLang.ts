export default function changeLang(this: any, to: string): void
{
    this.selectedLang = to;
    // @ts-ignore
    document.querySelector('html').setAttribute("lang", to);
}