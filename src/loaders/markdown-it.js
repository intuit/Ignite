import { getOptions } from 'loader-utils';
import MarkdownIt from 'markdown-it';

export default function(source) {
  const options = getOptions(this);
  const renderer = new MarkdownIt(options);

  if (options.plugins) {
    options.plugins.forEach(plugin => {
      let options = {};

      if (typeof plugin === 'string') {
        plugin = require(plugin);
      }

      if (Array.isArray(plugin)) {
        options = plugin[1];
        plugin = require(plugin[0]);
      }

      renderer.use(plugin, options);
    });
  }

  return renderer.render(source);
}
