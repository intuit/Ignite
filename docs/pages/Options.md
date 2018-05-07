# Options

All options can be used as CLI arguments or declared in the package.json.

```json
{
  "ignite": {
    "src": "some/path/to/folder"
  }
}
```

---

## Source (--src, -s)

Source folder to search for markdown files in

```bash
ignite --src docs
```

## Destination (--dst, -d)

Folder to output bundled documentation website.

```bash
ignite --dst _ignite
```

## Index (--index, -i)

Fill to be used as the index of your website. Is also used as the sidebar. This file should be located in the docs folder

```bash
ignite --index index.md
```

## Plugins (--plugins)

A list of plugins (package names or functions) to render your documentation with.

```bash
ignite --plugins markdown-it-emoji markdown-it-video
```

## Publish (--publish)

Publish the docs to the githubURL. Must [setup](./pages/Publishing.md)

```bash
ignite --publish
```

## Watch (--watch, -w)

Build the documentation website and serve it on localhost. Default port is 8008.

```bash
ignite --watch
```

## Port (--port, -p)

Port to start the documentation website on.

```bash
ignite --port 1337
```

## Title (--title, -t)

Title of the docs. Usually what you are documenting. Used in the navigation bar.

```bash
ignite --title 'My Cool Docs'
```

## Logo (--logo)

Logo for app. Displayed in title bar.

```bash
ignite --title 'logo.svg'
```

## GitHub URL (--githubURL)

If present includes a link to github. Usually where you store the source code for what you're documenting.

```bash
ignite --githubURL https://github.com/Team/Project
```

## Code Highlight Style (--codeStyle)

Code highlight style for code blocks. Can use any of [these](https://github.com/isagalaev/highlight.js/tree/master/src/styles) styles

```bash
ignite --codeStyle foundation
```

## App Color (--color, -c)

Specify the color to use throughout the app.

```bash
ignite --color 'cadetblue'
ignite --color '#f44336'
```

---

## Utility Commands

### Version (--version, -v)

Current version of Ignite.

```bash
ignite --version
```

### Help (--help -h)

List all of these commands an their defaults.

```bash
ignite --help
```
