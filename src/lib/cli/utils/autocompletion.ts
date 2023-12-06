export function getAutocompleteSuggestion(context: string): string[]
{
    let workingOn: string[] | string = context.split(/\|\||;/)
    workingOn = workingOn[workingOn.length - 1].trimStart();

    return [];
}
