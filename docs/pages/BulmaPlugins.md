# Bulma Plugins

Ignite is build upon Bulma and exposes some of the elements and components as markdown extensions. Not all of them are implemented but feel free to make a pull request!

## Elements

### [Tags](https://bulma.io/documentation/elements/tag/)

Small tag labels to insert anywhere

Structure: # : [[COLOR](https://bulma.io/documentation/elements/tag/#colors)] {YOUR_STRING}

Structure: # : [[COLOR](https://bulma.io/documentation/elements/tag/#colors)]:[[SIZE](https://bulma.io/documentation/elements/tag/#sizes)] {YOUR_STRING}

```markdown
#:is-info useful information #:is-success:is-large extension
```

OUTPUT:

#:is-info useful information #:is-success:is-medium extension extension

## [Progress](https://bulma.io/documentation/elements/progress/)

Native HTML progress bars

STRUCTURE: %% [VALUE COLOR SIZE] Message %%

Value is required.

```markdown
%% 75 is-primary is-large message %%
```

OUTPUT:

%% 75 is-primary is-large Look at all this progress! %%

## [Hero](https://bulma.io/documentation/layout/hero/)

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
