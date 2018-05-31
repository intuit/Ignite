import { getOptions } from 'loader-utils';
import MarkdownIt from 'markdown-it';

export function setUpMarkdownRenderer(options) {
  const renderer = new MarkdownIt(options);

  if (options && options.plugins) {
    options.plugins.forEach(plugin => {
      let options = {};

      if (typeof plugin === 'string') {
        plugin = require(plugin);
      }

      if (Array.isArray(plugin)) {
        [, options] = plugin;
        plugin = require(plugin[0]);
      }

      renderer.use(plugin, options);
    });
  }

  return renderer;
}

export function renderMarkdown(source, options = {}) {
  const renderer = setUpMarkdownRenderer(options);
  return renderer.render(source);
}

export default function(source) {
  const options = getOptions(this);
  return renderMarkdown(source, options);
}
