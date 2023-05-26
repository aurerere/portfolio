export default function scrollToSection(this: any, ref: string): void
{
    const y = ref === 'presentation' ? 0 : this.$refs[ref].offsetTop - this.$refs.header.offsetHeight;
    window.scrollTo(0, y)
}