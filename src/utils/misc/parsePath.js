import store from "@/store";

export default function parsePath(relativePath)
{
    relativePath = relativePath.split(/\/|\\/gm);

    let path = [...store.state.path];

    if (relativePath[0] === "~")
        return relativePath;

    else {
        for (let i = 0; i < relativePath.length; i++)
        {
            switch (relativePath[i]) {
                case "..":
                    if (path.length > 1)
                        path.pop();
                    else
                        return false;
                    break;
                case ".":
                    break;
                default:
                    if (!relativePath[i])
                        break;
                    path.push(relativePath[i]);
            }
        }
    }

    return path;
}