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

````markdown
\```javascript
\```
````

Highlight style can be configured via [options](./pages/Options.md#code-highlight-style-codestyle)

## (Super|Sub)script

Add characters printed above or below the line.

```markdown
29\^th\^ H\~2\~0
```

OUTPUT: 29^th^ H~2~0

## Underline

```markdown
\+\+underline\+\+
```

OUTPUT: ++underline++

## Highlight

```markdown
\=\=highlight\=\=
```

OUTPUT: ==highlight==

## Check Boxes and Task Lists

```markdown
\[ \] unchecked
\[x\] checked
```

OUTPUT:
[ ] unchecked
[x] checked
