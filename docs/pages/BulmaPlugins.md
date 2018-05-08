# Bulma Plugins

Ignite is build upon Bulma and exposes some of the elements and components as markdown extensions. Not all of them are implemented but feel free to make a pull request!

## Elements

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

### [Tags](https://bulma.io/documentation/elements/tag/)

Small tag labels to insert anywhere

Structure: # : [[COLOR](https://bulma.io/documentation/elements/tag/#colors)] {YOUR_STRING}

Structure: # : [[COLOR](https://bulma.io/documentation/elements/tag/#colors)]:[[SIZE](https://bulma.io/documentation/elements/tag/#sizes)] {YOUR_STRING}

```markdown
#:is-info useful information #:is-success:is-large extension
```

OUTPUT:

#:is-info useful information #:is-success:is-medium extension extension

### [Progress](https://bulma.io/documentation/elements/progress/)

Native HTML progress bars

STRUCTURE: %% [VALUE COLOR SIZE] Message %%

Value is required.

```markdown
%% 75 is-primary is-large message %%
```

OUTPUT:

%% 75 is-primary is-large Look at all this progress! %%

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
