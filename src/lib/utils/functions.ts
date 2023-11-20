import type {IconDefinition} from "@fortawesome/fontawesome-common-types";
import {faEarthAfrica, faFile} from "@fortawesome/free-solid-svg-icons";
import {faGithub, faLinkedin} from "@fortawesome/free-brands-svg-icons";

export function getDeviceInfo(): Core.DeviceInfo
{
    const userAgent = navigator.userAgent.toLowerCase();
    let device: Core.DeviceInfo["device"] = "mobile";
    let keyboard: Core.DeviceInfo["keyboard"] = "default";

    if (userAgent.indexOf('iphone') !== -1 || userAgent.indexOf('ipad') !== -1 || userAgent.indexOf('mac') !== -1)
        keyboard = "apple";

    if (
        (userAgent.indexOf('mac') !== -1 && userAgent.indexOf('iphone') === -1) ||
        userAgent.indexOf('win') !== -1 || userAgent.indexOf('x11') !== -1
    )
        device = "desktop";

    return { device, keyboard };
}

export function getIconFromString(str: string): IconDefinition
{
    switch (str) {
        case "file":
            return faFile;
        case "linkedin":
            return faLinkedin;
        case "github":
            return faGithub;
        default:
            return faEarthAfrica;
    }
}
