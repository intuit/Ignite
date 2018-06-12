/* eslint-disable import/no-unresolved */

const path = require('path');
const highlightjs = require('highlight.js');

const renderBlogFrontMatter = require('./dist/extensions/front-matter-render');
const makePlugin = require('./dist/extensions/ignite-plugin').default;

const splitPlugins = plugins => {
  const markdownPlugins = [];
  let ignitePlugins = [];

  plugins.forEach(plugin => {
    if (Array.isArray(plugin)) {
      ignitePlugins.push(plugin);
    } else {
      markdownPlugins.push(plugin);
    }
  });

  ignitePlugins = ignitePlugins.map(plugin => {
    if (plugin[1][0] === '.' || plugin[1][0] === '/') {
      plugin[1] = path.resolve(plugin[1]);
      return plugin;
    }

    return plugin;
  });

  return {
    markdownPlugins,
    ignitePlugins
  };
};

const generateConfig = plugins => {
  const { markdownPlugins, ignitePlugins } = splitPlugins(plugins);
  const pluginTokens = ignitePlugins.map(plugin => makePlugin(plugin[0]));

  return {
    xhtmlOut: true,
    plugins: [
      require('./dist/extensions/jsx-fence'),
      'markdown-it-jsx',
      [
        'markdown-it-checkbox',
        {
          divWrap: true
        }
      ],
      'markdown-it-br',
      'markdown-it-sub',
      'markdown-it-mark',
      'markdown-it-ins',
      'markdown-it-sup',
      'markdown-it-highlight-lines',
      ['markdown-it-front-matter', renderBlogFrontMatter],
      [
        'markdown-it-anchor',
        {
          permalink: true,
          permalinkSymbol: '',
          permalinkClass: 'fas fa-hashtag headerLink',
          level: 2
        }
      ],
      'markdown-it-emoji',
      [
        'markdown-it-attrs',
        {
          leftDelimiter: '/',
          rightDelimiter: '\\'
        }
      ],
      'markdown-it-external-links',
      [
        'markdown-it-table-of-contents',
        {
          includeLevel: [2, 3]
        }
      ],
      require('./dist/extensions/jsx-inline'),
      require('./dist/extensions/font-awesome'),
      require('./dist/extensions/bulma-tag'),
      require('./dist/extensions/bulma-progress'),
      require('./dist/extensions/bulma-hero'),
      require('./dist/extensions/bulma-message'),
      require('./dist/extensions/bulma-box'),
      require('./dist/extensions/bulma-button'),
      require('./dist/extensions/bulma-row'),
      require('./dist/extensions/bulma-tile'),
      require('./dist/extensions/collapse'),
      require('./dist/extensions/embed'),
      require('./dist/extensions/code-tabs'),
      require('./dist/extensions/div'),
      ...pluginTokens,
      ...markdownPlugins
    ],
    highlight: (code, language) => {
      return language && highlightjs.getLanguage(language)
        ? highlightjs.highlight(language, code).value
        : code;
    }
  };
};

module.exports = {
  splitPlugins,
  generateConfig
};
