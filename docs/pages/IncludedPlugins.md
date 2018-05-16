# Included Plugins

## Collapse

Make a set of elements collapsible. If first word is 'open' the elements will default to being shown.

```markdown
::: collapse Title For Collapse Area
Some text
:::
```

OUTPUT:

::: collapse Title For Collapse Area
Some text
:::

Collapse in the sidebar defaults to open.

It is possible to make a list or sublist collapsible too. The ending `:::` is not needed in this case.

```
* ::: collapse [:package: Publishing](./pages/Publishing.md)
  * [Setup](./pages/Publishing.md#setup-branch)
  * [Continuous Integration](./pages/Publishing.md#Continuous-integration)
```

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
```javascript
```
````

## Highlight Specific lines

_NOT WORKING_

You can call attention to specific lines in your code by including the lines in the block definition.

````markdown
```javascript
function foo() {
  return bar().then(res => {
    return res.doSomething();
  });
}
```
````

OUTPUT:

```javascript
function foo() {
  return bar().then(res => {
    return res.doSomething();
  });
}
```

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
29^th^ H~2~0
```

OUTPUT: 29^th^ H~2~0

## Underline

```markdown
++underline++
```

OUTPUT: ++underline++

## Highlight

```markdown
==highlight==
```

OUTPUT: ==highlight==

## Check Boxes and Task Lists

```markdown
[ ] unchecked
[x] checked
```

OUTPUT:

[ ] unchecked
[x] checked

## Breaks

Some times you just need a break.

```markdown
paragraph 1

<br>

paragraph 1
```

OUTPUT:

paragraph 1

<br>

paragraph 1

## HTML Attributes

Add a class, id, or attribute to an element.

More documentation [here](https://www.npmjs.com/package/markdown-it-attrs).

```markdown
# Title {.has-text-danger}
```

OUTPUT:

# Title {.has-text-danger}

::: message is-success is-8 is-offset-2 has-text-centered
TIP: Use with [Bulma Helpers](./BulmaPlugins.md#useful-helpers) to style your page perfectly!
:::
