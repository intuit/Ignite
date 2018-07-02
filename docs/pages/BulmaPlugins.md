# Bulma Plugins

Ignite is built upon Bulma and exposes some of the elements and components as markdown extensions. Not all of them are implemented but feel free to make a pull request!

## Elements

### [Button](https://bulma.io/documentation/elements/button/)

The classic button, in different colors, sizes, and states

```markdown
::: button is-large is-bold
[Get Started :tada:](GettingStarted.md)
:::
```

OUTPUT:

::: button is-large is-bold
[Get Started :tada:](GettingStarted.md)
:::

### [Box](https://bulma.io/documentation/elements/box/)

The .box element is simply a container with a shadow, a border, a radius, and some padding.
For example, you can include a media object.

```markdown
::: box

# Title

I can contain various combinations of elements.
:::
```

OUTPUT:

::: box

# Title

I can contain various combinations of elements.
:::

### [Message](https://bulma.io/documentation/components/message/)

Colored message blocks, to emphasize part of your page. Supports color, size, w/o Title

```markdown
::: message is-warning
:warning: Body of the message
:::

::: message is-danger Message with a Title
Body of the message
:::
```

OUTPUT:

::: message is-warning
:warning: Body of the message
:::

::: message is-danger Message with a Title
Body of the message
:::

### [Progress](https://bulma.io/documentation/elements/progress/)

Native HTML progress bars

STRUCTURE: %% [VALUE COLOR SIZE] Message %%

Value is required.

```markdown
%% 75 is-primary is-large message %%
```

OUTPUT:

%% 75 is-primary is-large Look at all this progress! %%

### [Tags](https://bulma.io/documentation/elements/tag/)

Small tag labels to insert anywhere

Structure: # : [[COLOR](https://bulma.io/documentation/elements/tag/#colors)][your_string]

Structure: # : [[COLOR](https://bulma.io/documentation/elements/tag/#colors)]:[[SIZE](https://bulma.io/documentation/elements/tag/#sizes)][your_string]

```markdown
#:is-info useful information #:is-success:is-large extension
```

OUTPUT:

#:is-info useful information #:is-success:is-medium extension extension

## Layout

### [Hero](https://bulma.io/documentation/layout/hero/)

The hero component allows you to add a full width banner to your webpage, which can optionally cover the full height of the page as well.

Support color, gradient, and size. Full height hero unsupported.

```markdown
::: hero is-primary is-bold is-medium

# This is getting cool

...really cool
:::
```

OUTPUT:

::: hero is-primary is-bold is-medium

# This is getting cool

## ...really cool

:::

### Row

An element to organize a bunch of boxes into equal columns.

```markdown
||| row

::: box

# Title

I can contain various combinations of elements.
:::

::: box

# Title

I can contain various combinations of elements.
:::

|||
```

OUTPUT:

||| row

::: box

# Title

I can contain various combinations of elements.
:::

::: box

# Title

I can contain various combinations of elements.
:::

|||

### Tile

A single tile element to build 2-dimensional Metro-like, Pinterest-like, or whatever-you-like grids.

```markdown
::: tile is-warning notification
I'm a simple tile.
:::
```

OUTPUT:

::: tile is-warning notification
I'm a simple tile.
:::

[COMPLEX OUTPUT](https://bulma.io/documentation/layout/tiles/#example):

::::::: tile is-ancestor
:::::: tile is-vertical is-8
::::: tile
:::: tile is-vertical is-parent

::: tile is-child is-primary notification

# Vertical

Top Tile
:::

::: tile is-child is-warning notification

# ...tiles

Bottom Tile
:::

::::

:::: tile is-vertical is-parent

::: tile is-child is-info notification

# Middle tile

:::

::::
:::::
::::: tile is-parent
::: tile is-child is-danger notification

# Wide Tile

## Aligned with the right tile

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros, eu pellentesque tortor vestibulum ut. Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.
:::
:::::
::::::
:::::: tile is-parent
::::: tile is-child notification is-success

# Tall tile

## With even more content

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam semper diam at erat pulvinar, at pulvinar felis blandit. Vestibulum volutpat tellus diam, consequat gravida libero rhoncus ut. Morbi maximus, leo sit amet vehicula eleifend, nunc dui porta orci, quis semper odio felis ut quam.

Suspendisse varius ligula in molestie lacinia. Maecenas varius eget ligula a sagittis. Pellentesque interdum, nisl nec interdum maximus, augue diam porttitor lorem, et sollicitudin felis neque sit amet erat. Maecenas imperdiet felis nisi, fringilla luctus felis hendrerit sit amet. Aenean vitae gravida diam, finibus dignissim turpis. Sed eget varius ligula, at volutpat tortor.

Integer sollicitudin, tortor a mattis commodo, velit urna rhoncus erat, vitae congue lectus dolor consequat libero. Donec leo ligula, maximus et pellentesque sed, gravida a metus. Cras ullamcorper a nunc ac porta. Aliquam ut aliquet lacus, quis faucibus libero. Quisque non semper leo.
:::::
::::::
:::::::

## [Useful Helpers](https://bulma.io/documentation/modifiers/)

Many of the Bulma plugins above can take bulma helper classes as arguments. These are applied to the html. These helpers can be used to change the color of text or backgrounds, to change the size of components, and to layout the components in a specific pattern.

The following are used throughout ignite and can be used to easily theme your plugins to match Bulma.

### [Color](https://bulma.io/documentation/modifiers/color-helpers/)

| Class                  | Effect                                                                                            |
| ---------------------- | ------------------------------------------------------------------------------------------------- |
| is-primary             | in combination with an element changes its color to whatever the theme sets for the primary color |
| has-background-[COLOR] | changes the background to one of the defined color values                                         |
| has-text-[COLOR]       | changes the text color to one of the defined color values                                         |

### [Size](https://bulma.io/documentation/columns/sizes/)

| Class            | Effect                                                                                                     |
| ---------------- | ---------------------------------------------------------------------------------------------------------- |
| is-[SIZE]        | Set a columns width [three-quarters, two-thirds, half, one-third, one-quarter, one-fifth, two-fifths, ...] |
| is-[NUMBER]      | Set a columns width to 1-12                                                                                |
| is-offset-[SIZE] | Set a columns offset (same values as size above)                                                           |

::: message is-success is-three-fifths is-offset-one-fifth has-text-centered
TIP: Use size and offset to narrow and center any bulma element
:::

### A Sneaky Div

Sometimes your just really want a div, so we gave you one!

```markdown
::: div takes classes like this
:::

::: div /.or .like .this\
:::
```
