# aureRe's Portfolio

## Installation

### Dependencies
- Node.js

### Steps
- packages installation:
    ```bash
    $ npm i
    ```
- Then:

    - Dev server (with hot reload):
      ```bash
      $ vite
      ```
    - Build with:
      ```bash
      $ npm run build
      ```
## CLI Setup
### File tree
This CLI is designed to mimic a file system. <br>
To set up the portfolio, you will need to create a file named `fileTree.json` in the `/public` directory. 
This file should contain a file tree structure that follows the type specified below:
```ts
type FileTree = {
    [key: string]: string | FileTree
}
```
Here is an example of a valid file tree structure:

```json
{
    "projects": {
        "project1": {
            "thumbnail.png": "file"
        }
    }
}
```

> ⚠️ The real file structure needs to correspond to the JSON file tree. <br> As an example `fileTree.json["projects"]["project1"]["thumbnail.png"]` should point to a file named `thumbnail.png` in the `/public/home/projects/project1` directory.

> ℹ️ elements of type `app` correspond to JavaScript code that will be called with `eval()`
### Commands
- `src/cli/commands` contains one file for each CLI command.
- The function is imported and linked to the command name in the `commands` const (`src/cli/parseInput.ts`)
- It needs to return `"ok"` if there is no response, a `String` if the response is plain text and an object with the type `CommandResult` if the response should be displayed using a special component
    ```ts
    type CommandResult = {
        component: string,
        content: any, // each component can have a different way to display content, so the type is not always the same
        more?: any // (optional) - additional information that may be needed if the function is used in a context other than a cli command.
    }
    ```
  As an example, this is how to call the error component 
    ```ts
    return {
        component: "error",
        content: "Error message"
    }
    ```
- You can create your own special components in the `src/components/cli/specialFormats` directory, and you will need to add a reference to the new component in the if statement in the `src/components/cli/CLIResultParser.vue` file.
