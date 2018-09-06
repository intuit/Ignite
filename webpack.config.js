const fs = require('fs');
const path = require('path');
const globby = require('globby');

const webpack = require('webpack');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const webpackMerge = require('webpack-merge');

const defaults = require('./dist/default-config');
const markdownItConfig = require('./markdownit.config');
const IgnitePlugin = require('./dist/plugins/IgniteInjectPlugin');
const babelRc = require('./.babelrc');

const babelConfig = options =>
  babelRc({
    env() {
      return options.mode;
    }
  });

const modeConfig = env =>
  require(`./build-utils/webpack.config.${env.mode}`)(env);

module.exports = options => {
  options = {
    ...defaults,
    ...options
  };

  const { ignitePlugins } = markdownItConfig.splitPlugins(options.plugins);

  const docs = globby.sync([path.join(options.src, '**/*.md')]);
  const logoPath = options.logo ? path.join(options.src, options.logo) : null;
  const logoExists = logoPath && fs.existsSync(path.resolve(logoPath));
  const dest = options.dst
    ? path.join(path.resolve(options.dst), options.baseURL)
    : null;

  return webpackMerge(
    {
      mode: options.mode,

      devtool: 'source-map',

      entry: [
        logoExists ? path.resolve(logoPath) : null,
        path.resolve(__dirname, './src/app/index.js')
      ].filter(Boolean),

      output: {
        path: dest,
        publicPath: options.baseURL
      },

      resolve: {
        alias: {
          ignite: path.resolve(__dirname, './src/app/index.js')
        }
      },

      module: {
        rules: [
          // Markdown
          {
            test: /\.md$/,
            use: [
              {
                loader: 'babel-loader',
                options: babelConfig(options)
              },
              {
                loader: path.resolve(
                  __dirname,
                  './dist/loaders/html-to-react.js'
                ),
                options
              },
              {
                loader: 'markdown-it-vanilla-loader',
                options: markdownItConfig.generateConfig(options.plugins)
              },
              {
                loader: path.resolve(__dirname, './dist/loaders/hash-link.js'),
                options
              }
            ]
          },
          // Javascript
          {
            test: /\.js$/,
            exclude: /node_modules\/(?!.*ignite\/src)/,
            use: {
              loader: 'babel-loader',
              options: babelConfig(options)
            }
          }
        ]
      },

      plugins: [
        new IgnitePlugin({
          entries: docs.map(doc => path.resolve(doc)),
          plugins: ignitePlugins,
          options
        }),
        new webpack.DefinePlugin({
          'process.env': {
            SEARCH: JSON.stringify(options.searchIndex),
            index: JSON.stringify(options.index),
            baseURL: JSON.stringify(options.baseURL),
            title: JSON.stringify(options.title),
            githubURL: JSON.stringify(options.githubURL),
            navItems: JSON.stringify(options.navItems),
            logo: JSON.stringify(
              logoExists ? path.join(options.baseURL, logoPath) : ''
            ),
            plugins: JSON.stringify(options.plugins)
          }
        }),
        options.log &&
          new FriendlyErrorsWebpackPlugin({
            clearConsole: options.mode !== 'production',
            compilationSuccessInfo: options.compilationSuccessInfo
          }),
        ...options.webpackPlugins
      ].filter(Boolean)
    },
    modeConfig(options)
  );
};
