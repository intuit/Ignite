import InjectPlugin from 'webpack-inject-plugin';

function generate(entries = [], plugins = []) {
  return () => {
    let generated = entries
      .map(
        e => `
          import('${e}',);
        `
      )
      .join('\n');

    if (plugins.length > 0) {
      generated += "import { registerPlugin } from 'ignite';";
      generated += plugins
        .map(
          e => `
            import ${e[0]} from '${e[1]}';

            registerPlugin('${e[0]}', ${e[0]});
          `
        )
        .join('\n');
    }

    return generated;
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
