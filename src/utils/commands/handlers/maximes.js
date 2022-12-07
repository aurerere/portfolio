export default function maximes()
{
    document.querySelectorAll('p').forEach(p => {
        p.style.animation = "maximes 1s infinite";
    });

    return "ok";
}