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
      generated += "import { registerPlugin } from 'ignite';\n";
      generated += 'let options;\n';

      // E0: Name of plugin
      // E1: Path to plugin (can be npm module name)
      // E2: Options for plugin
      generated += plugins
        .map(
          e => `
            import * as ${e[0]} from '${e[1]}';
            options = ${e[2] ? JSON.stringify(e[2]) : '{}'};

            registerPlugin('${e[0]}', ${e[0]}.default, options);
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
