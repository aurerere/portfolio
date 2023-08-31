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
