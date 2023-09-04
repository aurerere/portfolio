export function getDeviceInfo(): { keyboard: "default" | "apple", device: "desktop" | "mobile" }
{
    const userAgent = navigator.userAgent.toLowerCase();
    let device: "desktop" | "mobile" = "mobile";
    let keyboard: "default" | "apple" = "default";

    if (userAgent.indexOf('iphone') !== -1 || userAgent.indexOf('ipad') !== -1 || userAgent.indexOf('mac') !== -1)
        keyboard = "apple";

    if (
        (userAgent.indexOf('mac') !== -1 && userAgent.indexOf('iphone') === -1) ||
        userAgent.indexOf('win') !== -1 || userAgent.indexOf('x11') !== -1
    )
        device = "desktop";

    return { device, keyboard };
}
