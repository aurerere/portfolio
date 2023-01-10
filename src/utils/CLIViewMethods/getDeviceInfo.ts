export default function getDeviceInfo(): { keyboardLayout: "default" | "apple", device: string }
{
    const userAgent = navigator.userAgent.toLowerCase();
    let device: "desktop" | "mobile" = "mobile";
    let keyboardLayout: "default" | "apple" = "default";

    if (userAgent.indexOf('win') > -1) {
        keyboardLayout = 'default';
        device = 'desktop';
    }
    else if (userAgent.indexOf('iphone') > -1) {
        keyboardLayout = 'apple';
        device = 'mobile';
    }
    else if (userAgent.indexOf('ipad') > -1) {
        keyboardLayout = 'apple';
        device = 'mobile';
    }
    else if (userAgent.indexOf('mac') > -1) {
        keyboardLayout = 'apple';
        device = 'desktop';
    }
    else if (userAgent.indexOf('android') > -1) {
        keyboardLayout = 'default';
        device = 'mobile';
    }
    else if (userAgent.indexOf('x11') > -1) {
        keyboardLayout = 'default';
        device = 'desktop';
    }

    return { keyboardLayout, device };
}