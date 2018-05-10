# Project Structure

Ignite builds the app from your side bar. Here is where your organize your documentation into overall ideas.

<br>

The default configuration looks for a file named `index.md` in your `docs/` directory. This file links to the rest of your documentation. Any linked `.md` files will be included in the docs website.

**_Changing the [default configuration](./Options.md#source-src-s)_**

```markdown
* [Introduction](./Introduction.md)
* [Page 1](./pages/Page1.md)
* [Page 2](./pages/Page2.md)
```

## Sub-Headings

You can have sub-lists in your navigation which will create nested navigation lists.

```markdown
* [Introduction](./Introduction.md)
  * [Page 1](./pages/Page1.md)
  * [Page 2](./pages/Page2.md)
```

## List Title

You can add context to your navigation by adding paragraphs between sections of your index file.

**_There must be an empty line between list sections_**

```markdown
Intro

* [Introduction](./Introduction.md)
  * [Page 1](./pages/Page1.md)
  * [Page 2](./pages/Page2.md)

Some Other Nav Section

* [Something Else](./Bees.md)
  ...
```
