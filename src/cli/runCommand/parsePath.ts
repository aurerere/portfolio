import store from "../../store";

export default function parsePath(relativePath: string)
{
    relativePath = relativePath.replace('/home/aureliendumay.me', '~')

    console.log('rp: ',relativePath)

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
            switch (relativePathArray[i]) {
                case "..":
                    if (path.length > 1)
                        path.pop();
                    else {
                        console.log('here2')
                        return false;
                    }
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