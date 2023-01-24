import store from "../../store";

export default function parsePath(relativePath: string)
{
    console.log('here')
    relativePath = relativePath.replace('/home/aureliendumay.me/', '~')

    if (relativePath.startsWith('/'))
        return false;

    const relativePathArray = relativePath.split("/");
    const path = [...store.state.path];

    if (relativePathArray[0] === "~") {

        if (relativePathArray[relativePathArray.length - 1] === '')
            relativePathArray.pop();

        return relativePathArray;
    }

    else {
        for (let i = 0; i < relativePathArray.length; i++)
        {
            console.log(relativePathArray[i])
            switch (relativePathArray[i]) {
                case "..":
                    if (path.length > 1)
                        path.pop();
                    else
                        return false;
                    break;
                case ".":
                    break;
                default:
                    if (!relativePathArray[i])
                        break;
                    path.push(relativePathArray[i]);
            }
        }
    }

    return path;
}