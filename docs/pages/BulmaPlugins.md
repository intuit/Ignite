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
