import store from "@/store";
import fileTree from "@/utils/fileTree.json";

export default function ls(path=store.state.path)
{
  let content = fileTree["~"].children;

  if (path.length === 1)
    return content;

  for (let i = 1; i < path.length; i++)
  {
    if (content[path[i]])
      content = content[path[i]].children;

    else
      return `ls: error`;
  }

  return content;
}