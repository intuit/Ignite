# Included Plugins

@[toc]

## Font awesome

All icons listed [here](https://fontawesome.com/icons/bomb?style=solid).

Structure: : [TYPE] - [ICON] :

```markdown
:fas-bomb:
```

OUTPUT:
:fas-bomb:

## Emoji

All emoji listed [here](https://github.com/markdown-it/markdown-it-emoji/blob/master/lib/data/full.json).

Structure: : [EMOJI] :

Transforms ascii emotes as [well](https://github.com/markdown-it/markdown-it-emoji/blob/master/lib/data/shortcuts.js).

```markdown
:banana: :)
```

OUTPUT:
:banana: :)

## Code Highlighting

Code blocks are colored with [Highlight.js](https://github.com/isagalaev/highlight.js). You must provide a language like this:

````
\```javascript
\```
````

Highlight style can be configured via [options](./pages/Options.md#code-highlight-style-codestyle)

## Table of Contents

Easily add a Table of Contents to any page More docs [here](https://github.com/CenterForOpenScience/markdown-it-toc).

```
\@\[toc\]
```

OUTPUT: See Top of Page
