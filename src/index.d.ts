namespace Core
{
    type DeviceInfo = {
        keyboard: "default" | "apple";
        device: "desktop" | "mobile";
    }
}

namespace Formal
{
    type LanguageSensitiveString = {
        en: string;
        fr: string;
    };

    type Lang = "fr" | "en";

    type Link = {
        url: string;
        icon: string;
        text: LanguageSensitiveString;
    };

    type Project = {
        name: LanguageSensitiveString;
        thumbnail: string;
        description: LanguageSensitiveString;
        tags: string[];
        done: boolean;
        links: Link[];
    };
}

namespace CLI
{
    type HistoryElement = {
        path: string[];
        command: Command;
    }

    type BinInput = {
        args: string[];
        flags: Array<{
            value: string,
            followedBy: string | null
        }>;
    }

    type Command = {
        input: string;
        output: BinOutput[];
    }

    type BinOutput = string | ComponentDependentBinOutput;

    type ComponentDependentBinOutput = {
        component: string;
        data: any;
    }
}
