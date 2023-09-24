namespace Core
{
    type DeviceInfo = {
        keyboard: "default" | "apple",
        device: "desktop" | "mobile"
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
        path: Path,
        command: Command
    }

    type Path = string[];

    type Command = {
        input: string;
        output: CommandResult[];
    }

    type CommandResult = StringCommandResult | ComponentDependentCommandResult;

    type StringCommandResult = string;

    type ComponentDependentCommandResult = {
        component: string;
        data: any;
    }
}
