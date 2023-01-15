import type { HelpResult } from "@/types";

export default function help(): HelpResult
{
    return {
        component: "help",
        content: {
            ls: {
                args: ['[optional]path'],
                description: 'List files and directories',
            },
            pwd: {
                args: [],
                description: 'Print working directory',
            },
            cd: {
                args: ['path'],
                description: 'Change directory',
            },
            more: {
                args: ['path'],
                description: 'Show file content',
            },
            'xdg-open': {
                args: ['path'],
                description: 'Open file with default application',
            },
            echo: {
                args: ['...text'],
                description: 'Prints text',
            },
            clear: {
                args: [],
                description: 'Clear terminal',
            },
            exit: {
                args: [],
                description: 'Exit terminal',
            }
        }
    }
}