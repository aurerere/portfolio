import type {IconDefinition} from "@fortawesome/fontawesome-common-types";
import {faBezierCurve, faDatabase, faEarthAfrica, faFile, faFileCode, faTag} from "@fortawesome/free-solid-svg-icons";
import {faCss3, faFigma, faGithub, faLinkedin, faNodeJs, faPhp, faVuejs} from "@fortawesome/free-brands-svg-icons";
import {MONTH_NAMES_SHORT_EN, MONTH_NAMES_SHORT_FR} from "@utils/const";

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

export function formatTimeLaps(dates: [string, string?], lang: Formal.Lang): string
{
    let mns = lang === "fr" ? MONTH_NAMES_SHORT_FR : MONTH_NAMES_SHORT_EN;

    const from = new Date(dates[0]);

    if (dates[1]) {
        const to = new Date(dates[1]);

        if (dates[0] === dates[1])
            return `${mns[from.getMonth()]} ${from.getFullYear()}`

        return `${mns[from.getMonth()]} ${from.getFullYear()} → ${mns[to.getMonth()]} ${to.getFullYear()}`
    }
    else {
        return `${lang === "fr" ? "Depuis" : "Since"} ${mns[from.getMonth()]} ${from.getFullYear()}`;
    }
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
        case "Svelte":
            return faFileCode;
        case "SurrealDB":
        case "MySQL":
        case "MongoDB":
            return faDatabase;
        case "Figma":
            return faFigma;
        case "Adobe Illustrator":
            return faBezierCurve;
        case "Pico.css":
            return faCss3;
        case "PHP":
            return faPhp;
        default:
            return context === "link" ? faEarthAfrica : faTag;
    }
}
