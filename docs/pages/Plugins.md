# Plugins

## Markdown-it Plugins

Ignite supports all the plugins available on the underlying markdown parser. Markdown-It has a large collection of plugins already [available](https://www.npmjs.com/search?q=keywords:markdown-it-plugin).

### Configuration

A markdown-it plugin can be included in 2 ways. For both you must include a plugins options when running Ignite.

It can either be the npm package name.

```json
{
  "plugins": ["markdown-it-emoji"]
}
```

or a local plugin

```js
{
  "plugins": [
    require('path/to/local/plugin')
  ]
}
```

#### Plugin Example

This is our implementation of a font-awesome 5 plugin. It matches tags in the markdown the look like `:far-flag:` and replaces them with the html representation.

```js
import makePlugin from 'markdown-it-regexp';

export default function fontawesomePlugin(md) {
  md.use(
    makePlugin(/:[a-z]{2,}-[a-z]{2,}:/, match => {
      const [type, icon] = match[0].split(':')[1].split('-');
      return `<i class="${type} fa-${icon}"></i>`;
    })
  );
}
```

The following is an partial es6 implementation of the 'markdown-it-regexp' used above. It shows how to hook into the markdown engine in a more complex manner.

```js
class Plugin {
  constructor(regexp, replacer) {
    this.regexp = regexp;
    this.replacer = replacer;

    this.id = 'regexp-' + counter;
    counter++;
  }

  init = (md, options) => {
    this.options = options;

    md.inline.ruler.push(this.id, this.parse);
    md.renderer.rules[this.id] = this.render;
  };

  parse = (state, silent) => {
    const match = this.regexp.exec(state.src);
    if (!match) return false;

    // Valid match found, now we need to advance cursor
    state.pos += match[0].length;

    // Don't insert any tokens in silent mode
    if (silent) return true;

    const token = state.push(this.id, '', 0);
    token.meta = { match };

    return true;
  };

  render = (tokens, id) => {
    return this.replacer(tokens[id].meta.match);
  };
}
```

## Useful Plugins

* [markdown-it-footnote](https://www.npmjs.com/package/markdown-it-footnote) - Footnotes with anchors
* [markdown-it-container](https://www.npmjs.com/package/markdown-it-container) - Plugin for creating block-level custom containers (a good starting place for a plugin)
* [markdown-it-abbr](https://www.npmjs.com/package/markdown-it-abbr) - Abbreviation (\<abbr\>) tag plugin
* [markdown-it-checkbox](https://www.npmjs.com/package/markdown-it-checkbox) - Plugin to create checkboxes
* [markdown-it-video](https://www.npmjs.com/package/markdown-it-video) - markdown-it plugin for embedding hosted videos.
* [markdown-it-mentions](https://www.npmjs.com/package/markdown-it-mentions) - Support Twitter like mentions
