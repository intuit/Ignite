# Included Plugins

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

## Image Captions

Adds a caption to an image and centers it within the page.

**_Must have 'caption' alt text for styles to work_**

```markdown
![caption](https://media.tenor.com/images/cb12bc24511449db821768715e85b0d9/tenor.gif)
_image caption_
```

OUTPUT:
![caption](https://media.tenor.com/images/cb12bc24511449db821768715e85b0d9/tenor.gif)
_image caption_

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
