import type { HelpResult } from "@/types";

export default function help(): HelpResult
{
    return {
        component: "help",
        content: {
            ls: {
                args: ['[optional]relativePath'],
                description: 'Lists files and directories',
            },
            pwd: {
                args: [],
                description: 'Displays the working directory path',
            },
            cd: {
                args: ['relativePath'],
                description: 'Sets the working directory to the specified path',
            },
            more: {
                args: ['relativePath'],
                description: 'Displays the contents of the file from the specified path',
            },
            'xdg-open': {
                args: ['relativePath'],
                description: 'Opens the file from the specified path with the default application (depending on its extension)',
            },
            echo: {
                args: ['...text'],
                description: 'Prints text',
            },
            clear: {
                args: [],
                description: 'Clears the CLI history',
            },
            exit: {
                args: [],
                description: 'Exits the CLI',
            }
        }
    }
}