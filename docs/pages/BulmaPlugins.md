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

STRUCTURE: %% [VALUE] %%

STRUCTURE: %% [VALUE:COLOR] %%

STRUCTURE: %% [VALUE:COLOR:SIZE] %%

STRUCTURE: %% [VALUE|VALUE:COLOR|VALUE:COLOR:SIZE][message] %%

Message can accept any combination of the above structures as well.

```markdown
%% 75:is-primary:is-large message %%
```

OUTPUT:

%% 75:is-primary:is-large Look at all this progress! %%
