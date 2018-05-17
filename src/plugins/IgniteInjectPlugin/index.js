import InjectPlugin from 'webpack-inject-plugin';

import generate from './generate';

class IgnitePlugin {
  constructor(options = {}) {
    this.plugins = options.plugins;
    this.entries = options.entries;
    this.options = options.options || {};
  }

  apply(compiler) {
    compiler.apply(
      new InjectPlugin(generate(this.entries, this.plugins, this.options))
    );
  }
}

module.exports = IgnitePlugin;
