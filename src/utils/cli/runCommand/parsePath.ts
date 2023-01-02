import store from "../../../store";

export default function parsePath(relativePath: string)
{
    if (relativePath.startsWith('/'))
        return false;

    const fullPath = relativePath.split("/");
    const path = [...store.state.path];

    if (fullPath[0] === "~")
        return fullPath;

    else {
        for (let i = 0; i < fullPath.length; i++)
        {
            switch (fullPath[i]) {
                case "..":
                    if (path.length > 1)
                        path.pop();
                    else
                        return false;
                    break;
                case ".":
                    break;
                default:
                    if (!fullPath[i])
                        break;
                    path.push(fullPath[i]);
            }
        }
    }

    return path;
}