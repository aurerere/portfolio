export default function iandry()
{
    document.querySelector('body').style.background = "#1e1f22";
    document.querySelectorAll('p').forEach(p => {
        p.style.animation = "none";
    });
    return "ok";
}