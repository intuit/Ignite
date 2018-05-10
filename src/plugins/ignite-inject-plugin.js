import InjectPlugin from 'webpack-inject-plugin';

function generate(entries = [], plugins = []) {
  return () => {
    const markdown = entries
      .map(
        e => `
      import('${e}',);
    `
      )
      .join('\n');

    const pluginsComponents = plugins
      .map(
        e => `
      import { registerPlugin } from 'ignite';
      import plugin from '${e[1]}';

      registerPlugin('${e[0]}', plugin);
    `
      )
      .join('\n');

    return markdown + pluginsComponents;
  };
}

class LazyLoadPlugin {
  constructor(options = {}) {
    this.plugins = options.plugins;
    this.entries = options.entries;
  }

  apply(compiler) {
    compiler.apply(new InjectPlugin(generate(this.entries, this.plugins)));
  }
}

module.exports = LazyLoadPlugin;
