# Ignite Plugins

Ignite plugins are incredibly easy to write. If you know how to write a react component, then you already know how to write an Ignite plugin.

Ignite works by parsing all of you markdown files into react components and loading them into a single page documentation app. Since we are already building the app in react, it makes sense to have the plugins just be react components.

## Define your plugin

```javascript
import React from 'react';

const myPlugin = props => (
  <div>
    <h1>This is pretty awesome.</h1>
    {props.children}
  </div>
);

export default myPlugin;
```

## Register Plugin

To register a component just add an entry to the plugins array defined in your config.

Ignite will load strings as markdown-it plugins. If an entry in the plugin array is an array, then the first element of that array is used as the plugin name and the second is used to load it. This can be either a path or a package name.

```json
{
  "ignite": {
    "plugins": [
      ["Boom", "/path/to/myPlugin.js"],
      "some-markdown-plugin",
      "another-markdown-plugin"
    ]
  }
}
```

## Use your plugins

Now that you have defined the behavior of your plugin and registered it with Ignite, you can use your plugin in any of your markdown pages.

You can use the plugin with a markdown syntax or just plain old JSX. To use the plugin as JSX make sure that the plugin is capitalized just like in normal JSX.

_Markdown:_

```markdown
::: Boom

# Anything inside

## is passed in as props.children

:::
```

_JSX:_

```html
<Boom>
  <h1>Anything inside</h1>
  <h2>is passed in as props.children</h2>
</Boom>
```

Will render this to the dom:

```html
<div>
  <h1>This is pretty awesome.</h1>
  <h1>Anything inside</h1>
  <h2>is passed in as props.children</h2>
</div>
```

### Options

Any single token arguments following the keyword become an array of `options` passed to the component as a prop.

```
::: boom these are individual props

## Anything inside

## is passed in as props.children

:::
```

### Properties

Any token after the arg with an equal sign in it is treated as a property. All matching tokens fill an object the is spread onto the component.

```
::: boom first=string second=2 third=["Array", "of, "Things"] fourth={ "some": "JSON Structure" }

# Anything inside

## is passed in as props.children

:::
```

::: message is-warning is-three-fifths is-offset-one-fifth has-text-centered
:warning:
Properties with arrays or objects must be valid JSON
:::

### Style

CSS Modules is supported for all plugins. To style your component simply import your styles and use them.

```javascript
import React from 'react';
import styles from './styles.css';

const myPlugin = props => (
  <div className={styles.unicorn}>
    <h1>This is pretty awesome.</h1>
    {props.children}
  </div>
);

export myPlugin;
```

## Using Any React Component

Since we can render a react component as a plugin that means we can use _ANY_ react component as plugin to our docs. If the component doesn't require state to be handled by the parent, using it is as simple as giving it a name!

## Download

Find some random react component you would like to use in your docs. Here we are gonna use [react-gist](https://github.com/tleunen/react-gist) a react gist component

```bash
yarn add react-gist
```

## Definition

Add an entry to your configuration's plugin section. The first item in the entry should be the name you want to give the plugin and the second is just the package name.

```json
{
  "plugins": [["Gist", "react-gist"]]
}
```

## All Done

Now you can use the new component anywhere! The possibilities for new components in your app are endless.

**Markdown**

```markdown
::: Gist id="5995ea726914f280afb3" file="Chef-Dockerfile"
:::
```

**JSX**

```jsx
<Gist id="5995ea726914f280afb3" file="Chef-Dockerfile" />
```

<Gist id="5995ea726914f280afb3" file="Chef-Dockerfile" />

## ES6 Imports

```json
{
  "plugins": ["ColorPicker, { SketchPicker, AlphaPicker }", "react-color"]
}
```

ColorPicker:

<ColorPicker />

<br />

SketchPicker:

<SketchPicker style={{ paddingBottom: 20 }} />

<br />

AlphaPicker:

<AlphaPicker />
