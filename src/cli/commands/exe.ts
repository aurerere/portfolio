import ls from "./ls";

export default async function exe(relativePath: string): Promise<CommandResult | SimpleCommandResult>
{
    const { invalidPath, realPath, exists, fileType, isDir, path }: LsResult["more"] = ls(relativePath).more;

    if (invalidPath)
        return {
            component: "error",
            content: `[error] cannot back from 'aureliendumay.me'`
        }

    if (!exists)
        return {
            component: "error",
            content: `[error] no such file: "${
                path?.join('/').replace('~', '/home/aureliendumay.me')
            }"`
        };

    if (isDir)
        return {
            component: "error",
            content: `"${
                path?.join('/').replace('~', '/home/aureliendumay.me')
            }" is a directory`
        };

    if (fileType !== "executable")
        return {
            component: "error",
            content: `"${
                path?.join('/').replace('~', '/home/aureliendumay.me')
            }" is not an executable file`
        };

    else {
        // Fetch the js app "source code"
        const response = await fetch(realPath);
        const fileContent = await response.text();

        // eval the js app "source code"
        eval(fileContent);

        return "ok";
    }

}
