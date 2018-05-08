import InjectPlugin from 'webpack-inject-plugin';

function generate(entries = []) {
  return () => entries.map(e => `import('${e}');`).join('\n');
}

class LazyLoadPlugin {
  constructor(options = {}) {
    this.entries = options.entries;
  }

  apply(compiler) {
    compiler.apply(new InjectPlugin(generate(this.entries)));
  }
}

module.exports = LazyLoadPlugin;
