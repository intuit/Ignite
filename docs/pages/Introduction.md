# :fire: Ignite :fire:

Modern markdown documentation generator.

Ignite makes it super easy to get a documentation website running.

## Features

* Easy Setup - define an index file and get to documenting!
* Themeable - Easily change the overall look of your app or just change 1 value
* Plugins - Extend any part of documentation generation or use any `markdown-it` plugin.
* Easy Publishing

## Project Structure

The sidebar is the root of your app and is located in index.md. This file links to the rest of your documentation. Any linked `.md` files will be included in the docs website.

```markdown
* [Introduction](./Introduction.md)
* [Page 1](./pages/Page1.md)
* [Page 2](./pages/Page2.md)
```
