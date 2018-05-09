# Ignite Plugins

Ignite plugins are incredibly easy to write. If you know how to write a react component, then you already know how to write an Ignite plugin.

Ignite works by parsing all of you markdown files into react components and loading them into a single page documentaion app. Since we are already building the app in react, it just made sense to have the plugins just be react components.

## Define your plugin

```javascript
import React from 'react';

const myPlugin = props => (
  <div>
    <h1>This is pretty awesome.</h1>
    {props.children}
  </div>
);

export default {
  name: 'boom',
  componenet: myPlugin
};
```

::: message is-warning is-three-fifths is-offset-one-fifth
:warning:
You have to give the default export a unique name and the plugin must be exported under component.
:::

## Register Plugin

[UNDER CONSTRUCTION]

## Use your plugins

Now that you have written the behavior of your plugin and registered it with your documentation website, you can use your plugin in any of your markdown pages.

In the example above we defined the name of the plugin to be `boom`. This means anytime the markdown parser sees a block with your name it knows to load your plugin.

_Usage:_

```markdown
::: boom

# Anything inside

## is passed in as props.children

:::
```

Will render this to the dom

```html
<div>
  <h1>This is pretty awesome.</h1>
  <h1>Anything inside</h1>
  <h2>is passed in as props.children</h2>
</div>
```

## Options

## Properties

## Style

## Using Any React Component

::: test tagLine="with some args"

This is my test

:::
