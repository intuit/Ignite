import { getOptions } from 'loader-utils';
import MarkdownIt from 'markdown-it';

export default function(source) {
  const options = getOptions(this);
  const renderer = new MarkdownIt(options);

  if (options.plugins) {
    options.plugins.forEach(plugin => {
      if (typeof plugin === 'string') {
        plugin = require(plugin);
      }

      renderer.use(plugin);
    });
  }

  return renderer.render(source);
}
