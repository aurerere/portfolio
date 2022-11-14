import store from "@/store";
import ls from "@/utils/commands/handlers/ls";

export default function cd(to='')
{
    let path = store.state.path;
    let toArray = to.split('/');

    console.log(toArray)

    if (toArray.length === 1 && toArray[0] === '')
        return "ok";

    for (let i = 0; i < toArray.length; i++)
    {
        if (toArray[i] === '..') {
            if (path.length > 1)
                path.pop();
            else
                return "cd: cannot go back from root";
        }
        else if (toArray[i] === '.')
            continue;
        else if (ls(path)[toArray[i]])
            path.push(toArray[i]);
        else
            return `cd: no such file or directory: '${to}'`;
    }

    store.commit('setPath', path);
    return 'ok';
}