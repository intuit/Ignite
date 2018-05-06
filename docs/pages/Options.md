# Options

All options can be used as CLI arguments or declared in the package.json.

```json
{
  "ignite": {
    "src": "some/path/to/folder"
  }
}
```

## Source (--src, -s)

Source folder to search for markdown files in

```shell
ignite --src docs
```

## Destination (--dst, -d)

Folder to output bundled documentation website.

```shell
ignite --dst _ignite
```

## Index (--index, -i)

Fill to be used as the index of your website. Is also used as the sidebar. This file should be located in the docs folder

```shell
ignite --index index.md
```

## Watch (--watch, -w)

Build the documentation website and serve it on localhost. Default port is 8008.

```shell
ignite --watch
```

## Port (--port, -p)

Port to start the documentation website on.

```shell
ignite --port 1337
```

## Title (--title, -t)

Title of the docs. Usually what you are documenting. Used in the navigation bar.

```shell
ignite --title My Cool Docs
```

## GitHub URL (--githubURL, -gh)

If present includes a link to github. Usually where you store the source code for what you're documenting.

```shell
ignite --githubURL https://github.com/Team/Project
```

## Code Highlight Style (--codeStyle, -cs)

Code highlight style for code blocks. Can use any of [these](https://github.com/isagalaev/highlight.js/tree/master/src/styles) styles

```shell
ignite --codeStyle foundation
```

## App Color (--color, -c)

Specify the color to use throughout the app.

```shell
ignite --color 'cadetblue'
ignite --color '#f44336'
```

## Utility Commands

### Version (--version, -v)

Current version of Ignite.

```shell
ignite --version
```

### Help (--help -h)

List all of these commands an their defaults.

```shell
ignite --help
```
