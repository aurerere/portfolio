export default function scrollHook(this: any)
{
    console.log(this)
    const pos = window.pageYOffset;
    const current = document.querySelector('.active') as HTMLElement;

    if (this.$refs.menu.classList.contains('opened'))
        this.closeMenu();

    if (pos > 5)
        this.$refs.sfm.classList.add('hidden')
    else
        this.$refs.sfm.classList.remove('hidden')


    if (pos > this.$refs['contact'].offsetTop - (3 * this.$refs.header.offsetHeight)) {
        if (current !== this.$refs['to-contact']) {
            current.classList.remove('active');
            this.$refs['to-contact'].classList.add('active');
            document.title = "Contact - Aurélien DUMAY"
        }
    }
    else if (pos > this.$refs['projects'].offsetTop - (3 * this.$refs.header.offsetHeight)) {
        if (current !== this.$refs['to-projects']) {
            current.classList.remove('active');
            this.$refs['to-projects'].classList.add('active');
            document.title = "Projects - Aurélien DUMAY"
        }
    }
    else {
        if (current !== this.$refs['to-presentation']) {
            current.classList.remove('active');
            this.$refs['to-presentation'].classList.add('active');
            document.title = "Portfolio - Aurélien DUMAY";
        }
    }
}