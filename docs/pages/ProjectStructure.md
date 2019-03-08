# Index Structure

Ignite builds the app from your side bar. Here is where you organize your documentation into overall ideas.

<br>

The default configuration looks for a file named `index.md` in your `docs/` directory. This file links to the rest of your documentation. Any linked `.md` files will be included in the docs website.

**_Changing the [default configuration](./Options.md#source-src-s)_**

```markdown
- [Introduction](./Introduction.md)
- [Page 1](./pages/Page1.md)
- [Page 2](./pages/Page2.md)
```

## Sub-Headings

You can have sub-lists in your navigation which will create nested navigation lists.

```markdown
- [Introduction](./Introduction.md)
  - [Page 1](./pages/Page1.md)
  - [Page 2](./pages/Page2.md)
```

## List Title

You can add context to your navigation by adding paragraphs between sections of your index file.

**_There must be an empty line between list sections_**

```markdown
Intro

- [Introduction](./Introduction.md)
  - [Page 1](./pages/Page1.md)
  - [Page 2](./pages/Page2.md)

Some Other Nav Section

- [Something Else](./Bees.md)
  ...
```

::: message is-warning
NOTE: if you want a list label to indent correctly you might have to add /.sidebar\
:::

## Multiple Top Level Tags

You can split your documentation up into multiple top level sections. To have multiple top level headings you will need to also have multiple index files in multiple folders.

Each index file will used as the sidebar and the first link in the sidebar as its default page.

```text
folder1/
  index.md
  other.md
folder2/
  index.md
  another.md
```

```json
{
  "navItems": {
    "root": "path/to/folder",
    "Name to Display in NavBar": "path/to/folder"
  }
}
```

::: message is-warning is-three-fifths is-offset-one-fifth

:warning: Root should point to the default folder.

:warning: All index files must have the same name specified in [configuration](Options.md#index-index-i).

:warning: All paths to NavItems use [source folder](Options.md#source-src-s) as root.

:::

::: message is-success is-three-fifths is-offset-one-fifth

If you aren't using GitHub pages make sure to redirect 404s to the 404.html.

:::
