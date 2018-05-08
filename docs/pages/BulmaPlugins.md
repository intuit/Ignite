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

#### Amount:

```markdown
%% 75 %%
```

OUTPUT:

%% 75 %%

#### Color

```markdown
%% 75:is-primary %%
```

OUTPUT:

%% 75:is-primary %%

#### Size

```markdown
%% 75:is-primary:is-large %%
```

OUTPUT:

%% 75:is-primary:is-large %%

**_Note: Their is no value:size_**

#### Message

Message can accept any combination of the above structures.

```markdown
%% 75:is-primary:is-large message %%
```

OUTPUT:

%% 75:is-primary:is-large Look at all this progress! %%
