import type {IconDefinition} from "@fortawesome/fontawesome-common-types";
import {faDatabase, faEarthAfrica, faFile, faFileCode, faTag} from "@fortawesome/free-solid-svg-icons";
import {faGithub, faLinkedin, faNodeJs, faVuejs} from "@fortawesome/free-brands-svg-icons";

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

export function getIconFromString(str: string, context: "tag" | "link" = "link"): IconDefinition
{
    switch (str) {
        case "file":
            return faFile;
        case "linkedin":
            return faLinkedin;
        case "github":
        case "GitHub Actions":
            return faGithub;
        case "Vue.js":
            return faVuejs;
        case "Express.js":
            return faNodeJs;
        case "TypeScript":
            return faFileCode;
        case "SurrealDB":
            return faDatabase;
        default:
            return context === "link" ? faEarthAfrica : faTag;
    }
}
