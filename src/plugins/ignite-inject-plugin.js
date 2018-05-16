import InjectPlugin from 'webpack-inject-plugin';

import { parseScript } from 'esprima';
import types from 'ast-types';
import escodegen from 'escodegen';

const { builders } = types;

const functionsToString = obj => {
  const isArray = Array.isArray(obj);
  let stringOptions = isArray ? '[' : '{';

  Object.entries(obj).forEach(([key, val]) => {
    if (typeof val === 'function') {
      val = val.toString();
    } else if (typeof val === 'object') {
      val = functionsToString(val);
    } else {
      val = `"${val}"`;
    }

    stringOptions += isArray ? `${val},` : `"${key}": ${val},`;
  });

  stringOptions += isArray ? ']' : '}';

  return stringOptions;
};

const stringify = code => {
  try {
    const options = functionsToString(code);
    const ast = parseScript(`var options = ${options}`).body;
    const program = builders.program(ast);

    return escodegen.generate(program);
  } catch (error) {
    console.log('Error parsing options.', error);
  }

  return code;
};

function generate(entries = [], plugins = []) {
  return () => {
    let generated = `
      window.configuration = {
        markdown: [],
        plugins: [],
      };
    `;

    generated += entries
      .map(
        e => `
          require('${e}');
        `
      )
      .join('\n');

    if (plugins.length > 0) {
      // E0: Name of plugin
      // E1: Path to plugin (can be npm module name)
      // E2: Options for plugin
      generated += plugins
        .map(e => {
          const options = e && e[2] ? stringify(e[2]) : 'var options = {}';

          return `
              import * as ${e[0]} from '${e[1]}';
              
              ${options};
  
              window.configuration.plugins.push(['${e[0]}', ${
            e[0]
          }.default, options]);
            `;
        })
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
